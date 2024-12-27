class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(studentRequest) {
        this.queue.push(studentRequest);
    }

    dequeue() {
        return this.queue.shift();
    }

    front() {
        return this.queue[0];
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    size() {
        return this.queue.length;
    }
}

module.exports = Queue;
