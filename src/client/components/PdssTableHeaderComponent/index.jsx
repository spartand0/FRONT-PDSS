
const PdssTableHeaderComponent = ({ header , t}) => {

		return <p className={`${header.className} ${header.extendedClassName}`}>{t(header.title)}</p>;
};

export default PdssTableHeaderComponent;
