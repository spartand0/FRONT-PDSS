import React from 'react';

function DownloadFilesListComponent({ t, files }) {
	// Function to render table rows for each file
	const renderTableRows = () => {
		return files.map((file) => (
			<tr key={file.name}>
				<td>{file.name}</td>
				<td>
					{/* Download link for the file */}
					<a href={`${process.env.REACT_APP_S3_ENDPOINT}/files/downloads/all/${file.path}`} target="_blank" rel="noopener noreferrer">
						{t('download_btn')}
					</a>
				</td>
			</tr>
		));
	};

	return (
		<div className="grid-x grid-margin-x">
			{/* Table for displaying files */}
			<table className="striped bordered">
				<thead>
					<tr>
						<th>{t('folder_cell')}</th>
						<th>{t('option_cell')}</th>
					</tr>
				</thead>
				{/* Table body containing file rows */}
				<tbody>{files && renderTableRows()}</tbody>
			</table>
		</div>
	);
}

export default DownloadFilesListComponent;
