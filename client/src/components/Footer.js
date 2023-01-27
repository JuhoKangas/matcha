const Footer = () => {
  return (
    <div className='p-3 bg-slate-400 flex justify-center text-sm text-gray-500 bg-gray-dark'>
      <p className='text-almost-white'>
        Alba & Juho & Kata © {new Date().getFullYear()}
      </p>
    </div>
  )
}

export default Footer
