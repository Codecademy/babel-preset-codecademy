@isTestable(true)
class MyClass {
  static classPropertyStatic = true;
  classProperty = true;

  render = (props, ...args) => {
    console.log(props);
  }
}

function isTestable(value) {
   return function decorator(target) {
      target.isTestable = value;
   }
}

new MyClass();

const jsx = (
  <div></div>
)
