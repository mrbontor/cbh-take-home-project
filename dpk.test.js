const Service = require("./dpk");
const sinon = require('sinon');

describe("deterministicPartitionKey", () => {
  let generateHashStub;
  beforeEach(async () => {
    generateHashStub = sinon.spy(Service, 'generateHash');
  });

  afterEach(() => {
    generateHashStub.restore();   
  });

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = Service.deterministicPartitionKey();
    
    expect(generateHashStub.calledOnce).toBe.false;    
    expect(trivialKey).toBe("0");
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey).toHaveLength(1)
  });

  
  it("Returns the literal value hex when given input without key `partitionKey`", () => {
    const trivialKey = Service.deterministicPartitionKey(1);
    expect(generateHashStub.calledOnce).toBe.true;
    expect(trivialKey).toBe(trivialKey);
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey).toHaveLength(128)
  });

  it("Returns the literal value when given input with event key `partitionKey`", () => {
    const trivialKey = Service.deterministicPartitionKey({
      partitionKey: 1
    });
    
    expect(generateHashStub.calledOnce).toBe.false;
    expect(trivialKey).toBe("1");
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey).toHaveLength(1)
  });

  it("Returns the literal value hex when given input event `partitionKey`", () => {
    const trivialKey = Service.deterministicPartitionKey({
      partitionKey: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
    });
    
    expect(generateHashStub.calledOnce).toBe.false;
    expect(trivialKey).toBe(trivialKey);
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey).toHaveLength(128)
  });
});
