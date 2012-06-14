require '../src/com/ciphor/ruby/Array.js'
describe 'com.ciphor.ruby.Array', ->
  testArray = null
  beforeEach ->
    testArray = [1, 2, 3, 4, 5]

  afterEach ->
    testArray = null

  it 'adds all elements in the given array into the self', ->
    testArray.push_all [6, 7, 8]
    expect(testArray.length).toEqual(8)
    expect(testArray).toContain(8)

  it 'returns a new array that is a copy of the original array, removing any items that also appear in "arr".', ->
    resutlArray = testArray.deduct [4,5]
    expect(resutlArray.length).toEqual(3)
