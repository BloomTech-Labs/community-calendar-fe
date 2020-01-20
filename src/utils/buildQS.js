export default function buildQS(params) {
  let qp = ''
  if (params) {
    for (let k in params) {
      qp += `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}&`
    }
    qp = '?' + qp.slice(0, -1)
  }
  return qp
}
