let total = 0;
for (let password = 137683; password <= 596253; password++) {
  if (ascending(password)) {
    if (hasDouble(password)) {
      total += 1;
    }
  }
}
console.log('total :', total);

function hasDouble(password) {
  password = password.toString();
  const repeat = password.match(/(.)\1/g);
  if (repeat) {
    for (const chars of repeat) {
      const index = password.indexOf(chars);
      if (password[index + 2] !== chars[0]) return true;
    }
  }
  return false;
}

function ascending(password) {
  return /^(?=\d{6}$)0?0?0?0?0?0?1?1?1?1?1?1?2?2?2?2?2?2?3?3?3?3?3?3?4?4?4?4?4?4?5?5?5?5?5?5?6?6?6?6?6?6?7?7?7?7?7?7?8?8?8?8?8?8?9?9?9?9?9?9?$/.test(
    password,
  );
}
