eval(loadFile("src/com/ciphor/ruby/String.js"));
var testString;

testCases(test,
		
		function setUp(){
			testString = "Hello World!";
		},
		
		function testStringCasecmp(){
			assert.that(testString.casecmp("hello world!"), isTrue());
		},
		
		function testStringCapitalise(){
			assert.that("hello!".capitalise(), eq("Hello!"));
		},
		
		function testStringEachChar(){
			assert.that(testString.each_char(function(c){
				return c+"_";
			}), eq("H_e_l_l_o_ _W_o_r_l_d_!_"));
		},
		
		function testStringEndWith(){
			assert.that(testString.end_with("d!"), isTrue());
			assert.that(testString.end_with("d"), isFalse());
		},
		
		function testStringInsert(){
			assert.that(testString.insert(6, "Mad "),eq("Hello Mad World!"));
			assert.that(testString.insert(-7, "Mad "),eq("Hello Mad World!"));
		},
		
		function testStringReverse(){
			assert.that(testString.reverse(), eq("!dlroW olleH"));
		},
		
		function testStringStrip(){
			assert.that("    \t\n\r1 23 45    \t\r\n  ".strip(), eq("1 23 45"));
		},
		
		function testStringSwapcase(){
			assert.that(testString.swapcase(), eq("hELLO wORLD!"));
		}		
);