({
	doInit : function(component, event, helper) {
		console.log(tf);
        const model = tf.sequential();
        model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({
  loss: 'meanSquaredError', 
  optimizer: 'sgd', 
  metrics: ['mse']
});
const xs = tf.tensor1d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
//y=3*x-1
const ys = tf.tensor1d([2, 5, 8, 11, 14, 17, 20, 23, 26, 27]);
        
        model.fit(xs, ys);
//model.fit(xs, ys, epochs=100)
console.log(model);
model.predict(tf.tensor1d([1,2,3,4])).print();
	}
})