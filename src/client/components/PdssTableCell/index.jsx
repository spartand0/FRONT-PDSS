import moment from "moment";
import reactStringReplace from "react-string-replace";
import NavItemComponent from "../NavItemComponent";

const PdssTableCellComponent = ({ data, header ,searchText, searchStatus, handleResume ,handleDelete, t}) => {
	switch (header.className) {
		case 'title':
			return (
				<p className={header.className}>
					{searchText.length > 0 && searchStatus
						? reactStringReplace(data[header.id], searchText, (match, i) => {
								return <span className="highlight">{data[header.id]}</span>;
						  })
						: data[header.id]}
				</p>
			);
		case 'datetime':
			return <p className={header.className}>{moment(data[header.id]).format('DD.MM.YYYY HH:mm')}</p>;
		case 'duration':
			return <p className={header.className}>{moment.utc(data[header.id] * 1000).format('HH:mm:ss')}</p>;
		case 'status':
			return (
				<p className={header.className}>
					{t(`diagnosis_Expand_status_${data[header.id]}`)}
					{data['started'] === 'training' ? ' (Training)' : null}
				</p>
			);
		case 'bar':
			return (
				<p className="process">
					<span className="percent">{data[header.id]}%</span>
					<span className="bg">
						<span className="bar" style={{ width: `${data[header.id]}%` }}></span>
					</span>
				</p>
			);
		case 'options':
			return (
				<p className="options text-right">
					<NavItemComponent className="resume-test" icon="video" action={handleResume(data)} />
					<NavItemComponent className="remove-test" icon="trash" action={handleDelete(data)} />
				</p>
			);
	}
};

export default PdssTableCellComponent;
