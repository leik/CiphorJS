eval(loadFile("src/com/ciphor/ruby/Object.js"));
eval(loadFile("src/com/ciphor/ruby/String.js"));

testCases(test,
		
		function setUp(){

		},
		
		function testAttrWriter(){
			var TestClass = function(foo){
				this.attr_writer("foo");
				this.setFoo(foo);
			};
			var testObject = new TestClass(12);
			assert.that(testObject.foo,eq(12));
		},
		
		function testAttrReader(){
			var TestClass = function(foo){
				this.attr_reader("foo");
				this.foo = foo;
			};
			var testObject = new TestClass(12);
			assert.that(testObject.getFoo(),eq(12));
		},
		
		function testAttrAccessor(){
			var TestClass = function(foo){
				this.attr_accessor("foo");
				this.setFoo(foo);
			};
			var testObject = new TestClass(12);
			assert.that(testObject.getFoo(),eq(12));
		}
		
);