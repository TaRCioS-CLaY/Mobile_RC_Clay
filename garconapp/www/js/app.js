$('.collection')
    .on('click', '.collection-item', function () {
        var $badge = $('.badge', this);
        if ($badge.length === 0) {
            $badge = $('<span class="badge brown-text">0</span>')
                .appendTo(this);
        }

        $badge.text(parseInt($badge.text()) + 1);
        var nomeProduto = this.firstChild.textContent;
        M.toast({ html: nomeProduto + ' adicionado', classes: 'rounded', displayLength: 1300});
    });

$('.collection')
    .on('click', '.badge', function () {
        if (this.textContent >= 1) {
            this.textContent = (Number)(parseInt(this.textContent) - 1);
            if (this.textContent < 1) this.remove();
        }
        return false;
    });

$('.acao-limpar').on('click', function () {
    $('#numero-mesa').val('');
    $('.badge').remove();
});

$(document).ready(function () {
    $('.modal').modal();
});

$('#confirmar').on('click', function () {
    var texto = "";
    $('.badge').parent().each(function () {
        texto += this.firstChild.textContent + ':	';
        texto += this.lastChild.textContent + ',	';
    });
    $('#resumo').empty().text(texto);
});

$('.dropdown-trigger').dropdown();