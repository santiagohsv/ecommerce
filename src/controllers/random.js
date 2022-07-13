const random = (cantidad) => {
  let unordered_array = [];
  for (let i = 0; i < cantidad; i++) {
    const random_number = parseInt(Math.random() * 100);
    unordered_array.push(random_number);
  }

  let ordered_array = unordered_array.sort((a, b) => a - b);

  let final_array = [];
  count = 1;

  for (let i = 0; i < ordered_array.length; i++) {
    if (ordered_array[i] === ordered_array[i + 1]) {
      count++;
    } else {
      final_array.push({ numero: ordered_array[i], repeticiones: count });
      count = 1;
    }
  }
  return final_array;
};

process.on("message", (msg) => {
  if (msg.cantidad === undefined) {
    const array = random(10000000);
    process.send(array);
  } else {
    const array = random(msg.cantidad);
    process.send(array);
  }
});
