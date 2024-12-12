function message() {
  let msg = "Friday is going to be rainy";
  let type = {
    radio: "radio message",
    tv: "TV message",
  };
  function date() {
    return new Date().toString();
  }
  function weatherForecast() {
    console.log(msg);
    console.log(type.radio);
    console.log(date());
  }
  return weatherForecast;
}

let weather = message();
weather();
