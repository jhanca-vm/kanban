export default function validateName(
  name: string,
  listName: Array<{ name: string }>,
  once = false
) {
  const count = listName.filter(item => item.name === name).length

  return count === Number(once) || 'Name already exists'
}
