const json = {
	roles: [],
	type: "1",
};
document.getElementById('json').innerHTML = hljs.highlight(JSON.stringify(json), { language: 'json' }).value;

for (const tag of ['input', 'select']) {
	$(tag).change((e) => {
		json[e.currentTarget.id] = e.currentTarget.value.replaceAll('\\n', '\n');
	
		document.getElementById('json').innerHTML = hljs.highlight(JSON.stringify(json), { language: 'json' }).value;
	});
}

$('button[id=addRole]').click((e) => {
	Swal.fire({
		title: 'Add Role',
		html:
			`<input id="swal-input1" class="swal2-input" placeholder="${json.type === "1" ? 'Button' : 'Option'} Label*" required />` +
            '<input id="swal-input2" class="swal2-input" placeholder="Role Id*" required />' +
            '<input id="swal-input3" class="swal2-input" placeholder="Emoji" />' +
			`${json.type === "2" ? '<input id="swal-input4" class="swal2-input" placeholder="Option Placeholder" />' : ''} ` +
			`${json.type === "1" ? '<select id="swal-input5" class="swal2-input" style="display: flex;"><option value="" disabled="">Select a style</option><option value="1">Primary</option><option value="2">Secondary</option><option value="3">Success</option><option value="4">Danger</option></select>' : ''}`,
		preConfirm: function () {
			return new Promise(function (resolve) {
				resolve([
					$('#swal-input1').val(),
					$('#swal-input2').val(),
					$('#swal-input3').val(),
					$('#swal-input4').val(),
					$('#swal-input5').val()
				]);
			});
		}
	}).then(function (result) {
		if (result.value?.[0] && result.value?.[1]) {
			json.roles.push({
				id: result.value[1],
				label: result.value[0],
				emoji: result.value[2] || null,
				placeholder: result.value[3] || null,
				style: parseInt(result.value[4]) || 2
			});

			document.getElementById('json').innerHTML = hljs.highlight(JSON.stringify(json), { language: 'json' }).value;
		} else Swal.fire('Missing parameters');
	}).catch(swal.noop);
});

$('pre[id=jsonPre].copy').click((e) => {
	navigator.clipboard.writeText(e?.currentTarget?.textContent || e.textContent);

	Swal.fire({
		position: 'top-end',
		icon: 'success',
		title: 'Copied!',
		showConfirmButton: false,
		timer: 1500
	});
});

$('button[id=buttonCopy]').click((e) => {
	const element = $('pre[id=jsonPre].copy')[0];
	navigator.clipboard.writeText(element?.currentTarget?.textContent || element.textContent);

	Swal.fire({
		position: 'top-end',
		icon: 'success',
		title: 'Copied!',
		showConfirmButton: false,
		timer: 1500
	});
});

$(window).on('load', () => {
	$('input').toArray().forEach((i) => i.value = '');
	document.getElementById('json').innerHTML = hljs.highlight(JSON.stringify(json), { language: 'json' }).value;
});