function save_options() {
    chrome.storage.sync.set({
        token:  $('#token').val(),
        idUser: $('#id_user').val(),
        time:   $('#time').val(),
        sound:  $('#sound').prop('checked'),
    }, function() {

        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {

    chrome.storage.sync.get({
        token:  '',
        idUser: '',
        time:   '',
        sound:  true
    }, function(items) {
        $('#token').val(items.token);
        $('#id_user').val(items.idUser);
        $('#time').val(items.time);
        $('#sound').prop('checked', items.sound);
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);