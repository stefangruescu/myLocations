import CheckboxBone from '@material-ui/core/Checkbox';

const Checkbox = ({ label, id, ...rest }) => {
  return (
    <>
      <CheckboxBone id={id} {...rest} />
      <label htmlFor={id}>{label}</label>
    </>
  );
};

export default Checkbox;
