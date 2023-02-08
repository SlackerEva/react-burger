function AppHeaderItem(props) {
  
  const { icon, title } = props;

  return(
    <>
      <div style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center' }} className='pl-5 pr-5 pb-4 pt-4'>
        {icon}
        <p className='pl-2 text text_type_main-default'>{title}</p>
      </div>
    </>
  );
}

export default AppHeaderItem;