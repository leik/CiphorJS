eval(loadFile("src/com/ciphor/Eve.js"));

testCases(test, 
  function testUnder() {
    var testResult = "";
    var aFunctionWithScope = function() {
      testResult += "e1_with_scope: AInternalAttribute = \'" + this.aInternalAttribute + "\'";
    };
    Eve.listen("e1").run(aFunctionWithScope).under({
      aInternalAttribute: "Hi",
      eve: Eve
    });
    Eve.lookup("e1").fire();
    assert.that(testResult, eq("e1_with_scope: AInternalAttribute = 'Hi'"));
    Eve.forget('e1');
  }, 
  
  function testNever() {
    var testResult = "";
    var aFuncToBeRemoved = function() {
      testResult +="e1_aFuncToBeRemoved";
    };
    Eve.listen("e1").run(aFuncToBeRemoved, 1);
    Eve.lookup("e1").never(aFuncToBeRemoved);
    Eve.lookup("e1").fire();
    assert.that(testResult, eq(""));
    Eve.forget('e1');
  }, 
  
  function testPriority() {
    var testResult = "";
    Eve.listen("e1").run( function() {
      testResult += "e1_3";
    }, 3);
    Eve.listen("e1").run( function() {
      testResult += "e1_2";
    }, 2);
    Eve.listen("e1").run( function() {
      testResult += "e1_with_no_priority";
    });
    Eve.lookup('e1').fire();
    assert.that(testResult, eq("e1_2e1_3e1_with_no_priority"));
    Eve.forget('e1');
  }, 
  
  function testArguments() {
    var testResult = "";
    var aFuncWithArguments = function(a, b) {
      testResult += "e1_aFuncWithArguments:" + Eve.lookup("e1").data().a + "," + Eve.lookup("e1").data().b;
    };
    Eve.listen("e1").run(aFuncWithArguments);
    Eve.lookup("e1").using({
      a: "1",
      b: "2"
    }).fire();
    assert.that(testResult, eq("e1_aFuncWithArguments:1,2"));
    Eve.forget('e1');
  }
);