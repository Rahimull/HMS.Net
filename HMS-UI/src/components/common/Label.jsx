const Label = ({name="Name"}) => {
  return (
    <>
      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block">
        {name}
      </label>
    </>
  );
};

export default Label;
