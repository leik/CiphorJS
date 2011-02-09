eval(loadFile("src/Eve.js"));
eval(loadFile("src/Reflection.js"));

var testObject;
var testResult = 0;

testCases(test,
		
		function setUp() {
			Eve.listen("e1").run(function() {
				testResult += 1;
			}, 9);
			testObject = Eve.lookup("e1");
		},
		
		function testGetMethods() {
			assert.that(testObject.getClass().getMethods(),
					isCollectionContaining("using","run","data","never","fire"));
		},
		
		function testGetFields(){
			assert.that(testObject.getClass().getFields(),
					isCollectionContaining("_name","_functions"));
		},
		
		function testField(){
			assert.that(testObject.getClass().getField("_name").getName(),eq("_name"));
			assert.that(testObject.getClass().getField("_name").getType(testObject),eq("string"));
			assert.that(testObject.getClass().getField("_name").get(testObject),eq("e1"));
			
      testObject.getClass().getField("_name").set(testObject,'e2');
      assert.that(testObject.getClass().getField("_name").get(testObject),eq("e2"));
		},
		
		function testInvokeMethod(){
			assert.that(testObject.getClass().getField("using").getName(),eq("using"));
      testObject.getClass().getMethod("using").invoke(testObject,{a:1,b:2});
      assert.that(testObject.data().a,eq(1));
      
      testObject.getClass().getMethod("run").invoke(testObject, function() {
      	testResult += 2;
      }, 1);
      testObject.fire();
      assert.that(testResult, eq(3));
		},
		
		function tearDown(){
			Eve.forget("e1");
		}

);