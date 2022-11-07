package topology

import (
	"fmt"

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

	if _, err = tx.Run("MATCH (n:Compliance) MERGE (m:ComplianceScan{node_id: n.scan_id, time_stamp: timestamp()}) MERGE (m) -[:DETECTED]-> (n)", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:Compliance) MERGE (m:ComplianceScan{node_id: n.scan_id}) MERGE (l:KCluster{node_id: n.kubernetes_cluster_id}) MERGE (m) -[:SCANNED]-> (l)", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:Node) WHERE n.kubernetes_cluster_id IS NOT NULL AND n.kubernetes_cluster_id <> '' MERGE (m:KCluster{node_id:n.kubernetes_cluster_id}) MERGE (m) -[:KHOSTS]-> (n)", map[string]interface{}{}); err != nil {
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

	if _, err = tx.Run("MATCH (n:Cve) MERGE (m:CveScan{node_id: n.scan_id, host_name:n.host_name, time_stamp: timestamp()}) MERGE (m) -[:DETECTED]-> (n)", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:CveScan) MERGE (m:Node{node_id: n.host_name}) MERGE (n) -[:SCANNED]-> (m)", map[string]interface{}{}); err != nil {
		return err
	}

	return tx.Commit()
}

func (tc *TopologyClient) AddSecrets(cs []map[string]interface{}) error {
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

	secrets := []map[string]interface{}{}
	for _, i := range cs {
		secret := map[string]interface{}{}
		match := i["Match"].(map[string]interface{})
		severity := i["Severity"].(map[string]interface{})
		rule := i["Rule"].(map[string]interface{})

		for k, v := range i {
			if k == "Match" || k == "Severity" || k == "Rule" {
				continue
			}
			secret[k] = v
		}

		for k, v := range rule {
			secret[k] = v
		}
		for k, v := range severity {
			secret[k] = v
		}
		for k, v := range match {
			secret[k] = v
		}
		secret["rule_id"] = fmt.Sprintf("%v:%v", rule["id"], i["host_name"])
		secrets = append(secrets, secret)
	}

	if _, err = tx.Run("UNWIND $batch as row MERGE (n:Secret{node_id:row.rule_id}) MERGE (m:SecretScan{node_id: row.scan_id, host_name: row.host_name, time_stamp: timestamp()}) MERGE (m) -[:DETECTED]-> (n) SET n+= row", map[string]interface{}{"batch": secrets}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:SecretScan) MERGE (m:Node{node_id: n.host_name}) MERGE (n) -[:SCANNED]-> (m)", map[string]interface{}{}); err != nil {
		return err
	}

	return tx.Commit()
}

func (tc *TopologyClient) AddCloudResources(cs []types.CloudResource) error {
	fmt.Println("test everything here", cs)
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

	if _, err = tx.Run("UNWIND $batch as row UNWIND row.security_groups as group MERGE (n:SecurityGroup{node_id:group.GroupId, name:group.GroupName}) MERGE (m:CloudResource{node_id:row.arn, resource_type:row.resource_id}) MERGE (n)-[:SECURED]->(m)", map[string]interface{}{"batch": types.ResourceToMaps(cs)}); err != nil {
		return err
	}
	fmt.Println("test everything here", cs)

	if _, err = tx.Run("UNWIND $batch as row MERGE (m:CloudResource{node_id:row.arn, resource_type:row.resource_id}) SET m+=row", map[string]interface{}{"batch": types.ResourceToMapsStrip(cs)}); err != nil {
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

	if _, err = tx.Run("UNWIND $batch as row MERGE (n:CloudCompliance{resource:row.resource, reason: row.reason}) MERGE (m:CloudResource{node_id:row.resource}) MERGE (n) -[:SCANNED]-> (m) SET n+= row", map[string]interface{}{"batch": types.CloudCompliancesToMaps(cs)}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:CloudCompliance) MERGE (m:CloudComplianceScan{node_id: n.scan_id, time_stamp: timestamp()}) MERGE (m) -[:DETECTED]-> (n)", map[string]interface{}{}); err != nil {
		return err
	}

	return tx.Commit()
}

func (tc *TopologyClient) LinkNodesWithCloudResources() error {
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

	if _, err = tx.Run("match (n) -[r:IS]-> (m) delete r", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("match (n:Node) WITH apoc.convert.fromJsonMap(n.cloud_metadata) as map, n WHERE map.label = 'AWS' WITH map.id as id, n match (m:CloudResource) where m.resource_type = 'aws_ec2_instance' and m.instance_id = id MERGE (n) -[:IS]-> (m)", map[string]interface{}{}); err != nil {
		return err
	}

	return tx.Commit()
}

func (tc *TopologyClient) ComputeThreatGraph() error {
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

	if _, err = tx.Run("MATCH (s:CveScan) -[:SCANNED]-> (m) WITH max(s.time_stamp) as most_recent, m MATCH (s:CveScan {time_stamp: most_recent})-[:DETECTED]->(c:Cve) WITH m, count(distinct c) as num_cve SET m.num_cve = num_cve", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (s:SecretScan) -[:SCANNED]-> (m) WITH max(s.time_stamp) as most_recent, m MATCH (s:SecretScan {time_stamp: most_recent})-[:DETECTED]->(c:Secret) WITH m, count(distinct c) as num_secrets SET m.num_secrets = num_secrets", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (s:ComplianceScan) -[:SCANNED]-> (m) WITH max(s.time_stamp) as most_recent, m MATCH (s:ComplianceScan {time_stamp: most_recent})-[:DETECTED]->(c:Compliance) WITH m, count(distinct c) as num_compliance SET m.num_compliance = num_compliance", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:Node) SET n.sum_cve = COALESCE(n.num_cve, 0), n.sum_secrets = COALESCE(n.num_secrets, 0), n.sum_compliance = COALESCE(n.num_compliance, 0);", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:Node) -[:CONNECTED]->(m:Node) SET n.sum_cve = COALESCE(n.sum_cve, 0) + COALESCE(m.sum_cve, m.num_cve, 0), n.sum_secrets = COALESCE(n.sum_secrets, 0) + COALESCE(m.sum_secrets, m.num_secrets, 0), n.sum_compliance = COALESCE(n.sum_compliance, 0) + COALESCE(m.sum_compliance, m.num_compliance, 0);", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:Node {node_id:'in-the-internet'})-[d:CONNECTS*]->(m:Node) with SIZE(d) as depth, m with min(depth) as min_depth, m SET m.depth = min_depth", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:Node) SET n.num_cve = COALESCE(n.num_cve, 0), n.num_secrets = COALESCE(n.num_secrets, 0), n.num_compliance = COALESCE(n.num_compliance, 0);", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:Node) SET n.sum_cve = n.num_cve, n.sum_secrets = n.num_secrets, n.sum_compliance = n.num_compliance;", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:Node) -[:CONNECTS]->(m:Node) SET n.sum_cve = COALESCE(n.sum_cve, 0) + COALESCE(m.sum_cve, m.num_cve, 0), n.sum_secrets = COALESCE(n.sum_secrets, 0) + COALESCE(m.sum_secrets, m.num_secrets, 0), n.sum_compliance = COALESCE(n.sum_compliance, 0) + COALESCE(m.sum_compliance, m.num_compliance, 0);", map[string]interface{}{}); err != nil {
		return err
	}


	if _, err = tx.Run("MATCH (n:SecurityGroup{ CidrIpv4: '0.0.0.0/0'} ) -[:SECURED]-> (m:CloudResource{resource_type:'aws_ec2_instance'}) where n.IsEgress = true MERGE (k:Node {node_id:'out-the-internet'})  MERGE (m)-[:PUBLIC]->(K)", map[string]interface{}{}); err != nil {
		return err
	}

	if _, err = tx.Run("MATCH (n:SecurityGroup{ CidrIpv4: '0.0.0.0/0'} ) -[:SECURED]-> (m:CloudResource{resource_type:'aws_ec2_instance'}) MATCH (k:Node {node_id:'in-the-internet'})  where n.IsEgress <> true  MERGE (k)-[:PUBLIC]->(m)", map[string]interface{}{}); err != nil {
		return err
	}

	// if _, err = tx.Run("MATCH (n:CloudResource{resource_type:'aws_ecs_task_definition', network_mode: 'vpc' })   MATCH (m:CloudResource{resource_type:'aws_ecs_service', task_definition: n.arn  })  WITH apoc.convert.fromJsonMap(m.task_definition) as map,m    WHERE map.network_configuration.AwsvpcConfiguration.AssignPublicIp = 'ENABLED'  MATCH (k:CloudResource{resource_type:'aws_ecs_task', service_name : m.service_name  }) MATCH (p:Node {node_id:'in-the-internet'})  MERGE (p) -[:PUBLIC]-> (k)", map[string]interface{}{}); err != nil {
	// 	return err
	// }

	// if _, err = tx.Run("MATCH (n:CloudResource{resource_type:'aws_ecs_task_definition'})   WITH apoc.convert.fromJsonMap(m.container_definitions) as container_definitions,n  FOREACH (container_def IN container_definitions | MATCH ( m:CloudResource{resource_type:'aws_ecs_service', task_definition: n.arn  })  WITH apoc.convert.fromJsonMap(m.task_definition) as map,m    WHERE map.network_configuration.AwsvpcConfiguration.AssignPublicIp = 'ENABLED'  MATCH (k:CloudResource{resource_type:'aws_ecs_task', service_name : m.service_name  })) MERGE (l:CloudResource{resource_type:'container_image', node_id: container_def.Image })  MERGE (l) -[:PUBLIC]-> (k) )", map[string]interface{}{}); err != nil {
	// 	return err
	// }

	// if _, err = tx.Run("MATCH (n:CloudResource{resource_type:'aws_s3_bucket', bucket_policy_is_public: true })  MATCH (p:Node {node_id:'in-the-internet'})   MERGE (p) -[:PUBLIC]-> (n)", map[string]interface{}{}); err != nil {
	// 	return err
	// }

	// if _, err = tx.Run("MATCH (n:CloudResource{resource_type:'aws_lambda_function' }) WITH apoc.convert.fromJsonMap(n.policy_std) as policy,n  where policy.Statement.Principal.AWS = '*' and policy.Statement.Effect = 'Allow'  MATCH (p:Node {node_id:'in-the-internet'})   MERGE (p) -[:PUBLIC]-> (n)", map[string]interface{}{}); err != nil {
	// 	return err
	// }

	// if _, err = tx.Run("MATCH (n:CloudResource{resource_type:'aws_s3_bucket' }) WITH apoc.convert.fromJsonMap(n.event_notification_configuration) as eventConfig,n   FOREACH (config IN eventConfig.LambdaFunctionConfigurations | MATCH (p:CloudResource{resource_type:'aws_lambda_function' , arn: config.LambdaFunctionArn})     MERGE (p) -[:OPERATES]-> (n) ) ", map[string]interface{}{}); err != nil {
	// 	return err
	// }

	// if _, err = tx.Run("MATCH (n:CloudResource{resource_type:'aws_ec2_classic_load_balancer', scheme : 'internet_facing' }) MATCH (p:Node {node_id:'in-the-internet'})   MERGE (p) -[:PUBLIC]-> (n)) ", map[string]interface{}{}); err != nil {
	// 	return err
	// }

	// if _, err = tx.Run("MATCH (n:CloudResource{resource_type:'aws_ec2_network_load_balancer', scheme : 'internet_facing' }) MATCH (p:Node {node_id:'in-the-internet'})   MERGE (p) -[:PUBLIC]-> (n)) ", map[string]interface{}{}); err != nil {
	// 	return err
	// }

	// if _, err = tx.Run("MATCH (n:CloudResource{resource_type:'aws_ec2_application_load_balancer', scheme : 'internet_facing' }) MATCH (p:Node {node_id:'in-the-internet'})   MERGE (p) -[:PUBLIC]-> (n)) ", map[string]interface{}{}); err != nil {
	// 	return err
	// }

	// if _, err = tx.Run("MATCH (n:CloudResource{resource_type:'aws_opensearch_domain' }) where n.vpc_options IS NULL MATCH (p:Node {node_id:'in-the-internet'})   MERGE (p) -[:PUBLIC]-> (n)) ", map[string]interface{}{}); err != nil {
	// 	return err
	// }

	// if _, err = tx.Run("MATCH (n:CloudResource{resource_type:'aws_rds_db_cluster'}) WITH apoc.convert.fromJsonMap(n.vpc_security_groups) as vpc_security_groups,n where vpc_security_groups.VpcSecurityGroupId.is_egress IS NOT NULL and  vpc_security_groups.VpcSecurityGroupId.cidr_ipv4= '0.0.0.0/0'  MERGE (p:Node {node_id:'out-the-internet'})   MERGE (n) -[:PUBLIC]-> (p)) ", map[string]interface{}{}); err != nil {
	// 	return err
	// }

	// if _, err = tx.Run("MATCH (n:CloudResource{resource_type:'aws_rds_db_cluster'}) WITH apoc.convert.fromJsonMap(n.vpc_security_groups) as vpc_security_groups,n where vpc_security_groups.VpcSecurityGroupId.is_egress IS  NULL and  vpc_security_groups.VpcSecurityGroupId.cidr_ipv4= '0.0.0.0/0'  MATCH (p:Node {node_id:'in-the-internet'})   MERGE (p) -[:PUBLIC]-> (n)) ", map[string]interface{}{}); err != nil {
	// 	return err
	// }

	return tx.Commit()
}
