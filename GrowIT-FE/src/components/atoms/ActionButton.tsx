type ActionButtonProps = {
  name: number
  actionImage: string
}

function ActionButton({ name, actionImage }: ActionButtonProps) {
  return (
    <>
      <p>{ name }</p>
      <img
        src={ actionImage }
        alt={`${name} 버튼`}
      />
    </>
  )
}

export default ActionButton