const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});

/* NYA TEST NEDANFÖR */
test('popping stack with two or more elements returns the elemnt on top of stack and removes it', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.pop()).toBe(42);
    expect(stack.peek()).toBe("wow");
});

// NYTT TEST
test('stack works with last in first out structure', () => {
    let inputElements = [1, "two", {three: 3}, "four", 5];
    inputElements.forEach(element => stack.push(element));
    
    for(let i = inputElements.length - 1; i >= 0; i--) {
        let poppedElement = stack.pop();
        expect(poppedElement).toEqual(inputElements[i]);
    }
});