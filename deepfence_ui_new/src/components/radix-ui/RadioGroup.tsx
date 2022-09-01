import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import classname from 'classnames';

// Exports
// Your app...

export const RadioGroupDemo = () => {
  return (
    <form>
      <RadioGroupPrimitive.Root defaultValue="default" aria-label="View density">
        <div style={{ display: 'flex', margin: '10px 0', alignItems: 'center' }}>
          <RadioGroupPrimitive.Item
            value="default"
            id="r1"
            className={classname(
              'radix-state-checked:bg-[#1C64F2]',
              'w-4 h-4 rounded-full ',
              'radix-state-unchecked: ring-1 ring-gray-200',
              //   'focus:ring-4',
              //   'focus:ring-["#C3DDFD"]',
              'radix-state-checked:ring-4',
              'radix-state-checked:ring-["#C3DDFD"]',
            )}
          >
            <RadioGroupPrimitive.Indicator
              className={classname(
                'flex items-center justify-center w-full h-full relative',
                'after:bg-white after:content-[""]',
                'after:block after:w-2 after:h-2 after:rounded-full',
              )}
            />
          </RadioGroupPrimitive.Item>
          <label htmlFor="r1" className="px-4">
            Active
          </label>
        </div>
        <div style={{ display: 'flex', margin: '10px 0', alignItems: 'center' }}>
          <RadioGroupPrimitive.Item
            style={{
              backgroundColor: '#1C64F2',
              width: '16px',
              height: '16px',
              borderRadius: '100%',
            }}
            value="default"
            id="r2"
            className={classname(
              'hover:bg-slate-500',
              'focus: shadow-md',

              //   'radix-state-checked:ring-4',
              //   'radix-state-checked:ring-["#C3DDFD"]',
            )}
          >
            <RadioGroupPrimitive.Indicator
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
              className={classname(
                'after:bg-white after:content-[""]',
                'after:block after:w-2 after:h-2 after:rounded-full',
              )}
            />
          </RadioGroupPrimitive.Item>
          <label htmlFor="r2" className="px-4">
            Checked
          </label>
        </div>
        <div style={{ display: 'flex', margin: '10px 0', alignItems: 'center' }}>
          <RadioGroupPrimitive.Item
            value="some"
            id="r3"
            className={classname(
              'w-4 h-4 rounded-full bg-[#F9FAFB]',
              'ring-1 ring-gray-200',
            )}
          ></RadioGroupPrimitive.Item>
          <label htmlFor="r3" className="px-4">
            Unchecked
          </label>
        </div>
      </RadioGroupPrimitive.Root>
    </form>
  );
};

export default RadioGroupDemo;
