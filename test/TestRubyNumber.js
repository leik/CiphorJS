eval(loadFile("src/com/ciphor/ruby/Number.js"));
var testNumber;

testCases(test,
		
		function setUp(){
			testNumber = 12;
		},
		
		function testTimes(){
			var aNumber = new Number(10);
			var temp = 0;
			var result = aNumber.times(function(item){
				temp++;
				return aNumber*item;
			});
			assert.that(temp, eq(10));
			assert.that(result, isCollectionContainingOnly(0,10,20,30,40,50,60,70,80,90));
		},
		
		function testNumberStep(){
			var temp =0;
			testNumber.step(function(i){
				temp ++;
			},30.4, 2.4);
			assert.that(temp,eq(8));
		}
);