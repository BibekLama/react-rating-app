export function queryString(params){
  var queries = [];
  for (var param in params) {
    var encodedKey = encodeURIComponent(param);
    var encodedValue = encodeURIComponent(params[param]);
    queries.push(encodedKey + "=" + encodedValue);
  }
  queries = queries.join("&");
  return queries.toString();
}