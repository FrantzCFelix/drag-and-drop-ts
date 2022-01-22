     // autobind decorator
    export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
        // console.log(`Autobind function ${target}`);
        // console.log(`Autobind function ${methodName}`);
        // console.log(`Autobind function ${Object.keys(descriptor)}`);
        const originalMethod = descriptor.value;
        const newDescriptor: PropertyDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                //console.log(boundFn);       
                return boundFn;
            }
    
        }
    
        return newDescriptor;
    }

