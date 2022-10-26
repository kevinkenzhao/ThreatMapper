package topology

import (
	"github.com/deepfence/fetcher_api_server/types"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)

type TopologyClient struct {
	driver neo4j.Driver
}

func NewTopologyClient() *TopologyClient {
	driver, err := neo4j.NewDriver("bolt://neo4j-db:7687", neo4j.BasicAuth("neo4j", "password", ""))

	if err != nil {
		return nil
	}

	nc := &TopologyClient{
		driver: driver,
	}

	return nc
}
func (tc *TopologyClient) Close() {
	tc.driver.Close()
}

func (tc *TopologyClient) AddCompliances(cs []types.ComplianceDoc) error {
	session, err := tc.driver.Session(neo4j.AccessModeWrite)

	if err != nil {
		return err
	}
	defer session.Close()

	tx, err := session.BeginTransaction()
	if err != nil {
		return err
	}
	defer tx.Close()

	if _, err = tx.Run("UNWIND $batch as row MERGE (n:Compliance{node_id:row.node_id, test_number:row.test_number}) SET n+= row", map[string]interface{}{"batch": types.CompliancesToMaps(cs)}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:Compliance) MERGE (m:ComplianceScan{node_id: n.scan_id}) MERGE (m) -[:DETECTED]-> (n)", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:Compliance) MERGE (m:ComplianceScan{node_id: n.scan_id}) MERGE (l:KCluster{node_id: n.kubernetes_cluster_id}) MERGE (m) -[:SCANNED]-> (l)", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:TNode) WHERE n.kubernetes_cluster_id IS NOT NULL AND n.kubernetes_cluster_id <> '' MERGE (m:KCluster{node_id:n.kubernetes_cluster_id}) MERGE (m) -[:KHOSTS]-> (n)", map[string]interface{}{}); err != nil {
		return err
	}

	return tx.Commit()
}

func (tc *TopologyClient) AddCloudCompliances(cs []types.CloudComplianceDoc) error {
	session, err := tc.driver.Session(neo4j.AccessModeWrite)

	if err != nil {
		return err
	}
	defer session.Close()

	tx, err := session.BeginTransaction()
	if err != nil {
		return err
	}
	defer tx.Close()

	if _, err = tx.Run("UNWIND $batch as row MERGE (n:CloudCompliance{resource:row.resource}) SET n+= row", map[string]interface{}{"batch": types.CloudCompliancesToMaps(cs)}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:CloudCompliance) MERGE (m:CloudComplianceScan{node_id: n.scan_id}) MERGE (m) -[:DETECTED]-> (n)", map[string]interface{}{}); err != nil {
		return err
	}

	return tx.Commit()
}

func (tc *TopologyClient) AddCVEs(cs []types.DfCveStruct) error {
	session, err := tc.driver.Session(neo4j.AccessModeWrite)

	if err != nil {
		return err
	}
	defer session.Close()

	tx, err := session.BeginTransaction()
	if err != nil {
		return err
	}
	defer tx.Close()

	if _, err = tx.Run("UNWIND $batch as row MERGE (n:Cve{node_id:row.cve_id}) SET n+= row", map[string]interface{}{"batch": types.CVEsToMaps(cs)}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:Cve) MERGE (m:CveScan{node_id: n.scan_id, host_name:n.host_name}) MERGE (m) -[:DETECTED]-> (n)", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:CveScan) MERGE (m:TNode{node_id: n.host_name}) MERGE (n) -[:SCANNED]-> (m)", map[string]interface{}{}); err != nil {
		return err
	}

	return tx.Commit()
}

func (tc *TopologyClient) AddSecrets(cs []types.SecretStruct) error {
	session, err := tc.driver.Session(neo4j.AccessModeWrite)

	if err != nil {
		return err
	}
	defer session.Close()

	tx, err := session.BeginTransaction()
	if err != nil {
		return err
	}
	defer tx.Close()

	// TODO
	rules := []map[string]interface{}{}
	secrets := []map[string]interface{}{}
	for _, i := range cs {
		secret := map[string]interface{}{}
		for k, v := range i.Match {
			secret[k] = v
		}
		for k, v := range i.Severity {
			secret[k] = v
		}

		secret["rule_id"] = i.Rule["id"]
		secrets = append(secrets, secret)
		rules = append(rules, i.Rule)
	}

	if _, err = tx.Run("UNWIND $batch as row MERGE (n:Rule{node_id:row.id}) SET n+= row", map[string]interface{}{"batch": rules}); err != nil {
		return err
	}

	if _, err = tx.Run("UNWIND $batch as row MERGE (n:Secret) SET n+= row WITH n MATCH (m:Rule{node_id:n.rule_id}) WITH m, n MERGE (n) -[:HAS]-> (m)", map[string]interface{}{"batch": secrets}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:Secret) MERGE (m:SecretScan{node_id: n.scan_id, host_name:n.host_name}) MERGE (m) -[:DETECTED]-> (n)", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:SecretScan) MERGE (m:TNode{node_id: n.host_name}) MERGE (n) -[:SCANNED]-> (m)", map[string]interface{}{}); err != nil {
		return err
	}

	return tx.Commit()
}
