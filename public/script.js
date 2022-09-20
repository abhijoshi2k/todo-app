function handleStrikethrough(id, checked) {
	fetch('/', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: id,
			checked: checked
		})
	});
}

function handleDelete(id) {
	// if response is {message: 'success'}, delete element with id
	fetch('/', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: id
		})
	}).then((response) => {
		if (response.status === 200) {
			document.getElementById(id).remove();
		} else {
			alert('Could not delete item');
		}
	});
}

function newCategory(e) {
	e.preventDefault();

	const category = document.getElementById('category-inp').value;

	location.href = '/category/' + encodeURIComponent(category);
}
