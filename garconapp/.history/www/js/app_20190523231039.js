$('.collection')
    .on('click', '.collection-item', function () {
        var $badge = $('.badge', this);
        if ($badge.length === 0) {
            $badge = $('<span class="badge brown-text">0</span>')
                .appendTo(this);
        }

        $badge.text(parseInt($badge.text()) + 1);
        var nomeProduto = this.firstChild.textContent;
        M.toast({ html: nomeProduto + ' adicionado', classes: 'rounded', displayLength: 1300 });
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

$('.scan-qrcode').on('click', function () {
    cordova.plugins.barcodeScanner.scan(
        function (resultado) {
            if (resultado.text) {
                M.toast({ html: 'Mesa	' + resultado.text });
                $('#numero-mesa').val(resultado.text);
            }
        },
        function (error) {
            M.toast({ html: 'Erro:	' + error });
        }
    );
});
$('.acao-finalizar').on('click', function () {
    $.ajax({
        url: 'http://cozinhapp.sergiolopes.org/novo-pedido',
        type: 'GET',
        dataType: 'JSON',
        data: {
            mesa: $('#numero-mesa').val(),
            pedido: $('#resumo').text()
        },
        error: function (erro) {
            M.toast({html: erro.responseText});
        },
        success: function (dados) {
            M.toast({html: dados});
            $('#numero-mesa').val('');
            $('.badge').remove();
        }
    });
});
$('#bolos').on('click', function(){
$('#bolos').hide();
});
// $('#ele_id').hide();