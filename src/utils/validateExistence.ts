export default function validateExistence(
  key: string,
  value: string,
  list: Record<string, any>[],
  once = false
) {
  const count = list.filter(item => item[key].trim() === value.trim()).length

  return count <= Number(once) || 'Name already exists'
}
