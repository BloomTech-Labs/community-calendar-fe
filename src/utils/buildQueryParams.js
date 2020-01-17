export default function buildQueryParams(params) {
  let qp = ''
  for (let k in params) {
    let newParam = `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
    qp += newParam
  }
  return qp
}
