export default function buildQueryParams(params) {
  let qp = ''
  for (let k in params) {
    qp += `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}&`
  }
  qp = '?' + qp.slice(0, -1)
  return qp
}
