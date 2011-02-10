eval(loadFile("src/Ruby.js"));
var testArray;

testCases(test,
		
		function setUp(){
			testArray = [1,2,3,4,5];
		},
		
		function testMap(){
			var results = testArray.map(function(i,item){
				return item*10;
			});
			assert.that(results,isCollectionContainingOnly(10,20,30,40,50));
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
		
		function testIntersection(){
			assert.that(testArray.intersect([2,3,6]),isCollectionContainingOnly(2,3));
		},
		
		function testDeduction(){
			assert.that(testArray.deduct([2,3]),isCollectionContainingOnly(1,4,5));
		},
		
		function testAt(){
			assert.that(testArray.at(-2),eq(4));
		},
		
		function testClear(){
			assert.that(testArray.clear().length,eq(0));
		},
		
		function testIsEmpty(){
			testArray.clear();
			assert.that(testArray.is_empty(), isTrue());
		},
		
		function testUniq(){
			testArray.push_all([1,2,3]);
			assert.that(testArray.uniq(), isCollectionContainingOnly(1,2,3,4,5));
		},
		
		function testValuesAt(){
			assert.that(testArray.values_at(1,2), isCollectionContainingOnly(2,3));
		},
		
		function testUnion(){
			assert.that(testArray.union([3,4,5,6,7]), isCollectionContainingOnly(1,2,3,4,5,6,7));
		},
		
		function testZip(){
			var zippedArray = testArray.zip(["a","b","c"],["a1","b1","c1","d1"]);
			assert.that(zippedArray[0],isCollectionContaining(1,"a","a1"));
			assert.that(zippedArray[1],isCollectionContaining(2,"b","b1"));
			assert.that(zippedArray[2],isCollectionContaining(3,"c","c1"));
			assert.that(zippedArray[3],isCollectionContaining(4,"d1"));
			assert.that(zippedArray[4],isCollectionContaining(5));
		},
		
		function testTranspose(){
			assert.that([[1,2], [3,4], [5,6]].transpose()[0],isCollectionContainingOnly(1,3,5));
			assert.that([[1,2], [3,4], [5,6]].transpose()[1],isCollectionContainingOnly(2,4,6));
		},
		
		function testTakeWhile(){
			testArray = [5,null,4,1,2];
			assert.that(testArray.take_while(function(i,el){
				return i<3;
			}), isCollectionContainingOnly(5));
		},
		
		function testSelect(){
			testArray = [5,null,4,1,2];
			assert.that(testArray.select(function(i,el){
				return el<3;
			}), isCollectionContainingOnly(1,2));
		},
		
		function testRotate(){
			assert.that(testArray.rotate(2), isCollectionContainingOnly(1,2,3,4,5));
			assert.that(testArray.rotate(2), containsInOrder(3,4,5,1,2));
			assert.that(testArray.rotate(-2), containsInOrder(4,5,1,2,3));
		},
		
		function testReject(){
			assert.that(testArray.reject(function(i,el){
				return el<3;
			}), isCollectionContainingOnly(3,4,5));
		},
		
		function testInsert(){
			assert.that(testArray.insert(3, "a","b"), containsInOrder(1,2,3,"a","b",4,5));
			assert.that(testArray.insert(-2, "a","b"), containsInOrder(1,2,3,4,"a","b",5));
		},
		
		function testEquals(){
			assert.that(testArray.equals([1,2,3,4,5]), isTrue());
			assert.that(testArray.equals([1,2,3,4,5,6]), isFalse());
			assert.that(testArray.equals([5,2,3,4,1]), isFalse());
		},
		
		function testCount(){
			testArray.push(6);
			assert.that(testArray.count(function(i,item){
				return item%2==0;
			}), eq(3));
			
			testArray.push(2,2);
			assert.that(testArray.count(2), eq(3));
		},
		
		function testRemoveAt(){
			testArray.remove_at(3);
			assert.that(testArray,isCollectionContainingOnly(1,2,3,5));
		},
		
		function testRemoveIf(){
			testArray.remove_if(function(i,item){
				return item>3;
			});
			assert.that(testArray,isCollectionContainingOnly(1,2,3));
		},
		
		function testFetch(){
			assert.that(testArray.fetch(-2),eq(4));
			assert.that(testArray.fetch(2),eq(3));
			assert.that(testArray.fetch(2, "defualt"),eq(3));
			assert.that(testArray.fetch(12, "defualt"),eq("defualt"));
		},
		
		function testIndex(){
			assert.that(testArray.index(2), eq(1));
			assert.that(testArray.index(function(i,el){
				return el == 2;
			}), eq(1));
			assert.that(testArray.index(6), isNull());
		},
		
		function testFlatten(){
			//[1,2,3,4,5,6,7,8,9,10]
			assert.that([1,2,[3,[4,5],6,[7]],8,[9,10]].flatten(),
					isCollectionContainingOnly(1,2,3,4,5,6,7,8,9,10));
			//[1, 2, 3, [4, 5], 6, [7], 8, 9, 10]
			assert.that([1,2,[3,[4,5],6,[7]],8,[9,10]].flatten(1)[3],
					isCollectionContainingOnly(4,5));
		},
		
		function testKeepIf(){
			assert.that(testArray.keep_if(function(i,item){
				return item<4;
			}), isCollectionContainingOnly(1,2,3));
		},
		
		function testSample(){
			assert.that(testArray.sample(3).uniq().length, eq(3));
			assert.that(testArray.sample().length, eq(1));
			shouldThrowException(function(){
				testArray.sample(6);
			});
		}
		
);