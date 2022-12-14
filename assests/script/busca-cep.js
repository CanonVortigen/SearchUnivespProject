$(document).ready(function () {

	$("#cep").mask("99999-999", {
		completed: function () {
			var cep = $(this).val().replace(/[^0-9]/, "");

			// Validação do CEP; caso o CEP não possua 8 números, então cancela
			// a consulta
			if (cep.length != 8) {
				return false;
			}

			// A url de pesquisa consiste no endereço do webservice + o cep que
			// o usuário informou + o tipo de retorno desejado (entre "json",
			// "jsonp", "xml", "piped" ou "querty")
			var url = "https://viacep.com.br/ws/" + cep + "/json/";

			$.getJSON(url, function (dadosRetorno) {
				try {
					// Preenche os campos de acordo com o retorno da pesquisa
					$("#endereco").val(dadosRetorno.logradouro);
					$("#bairro").val(dadosRetorno.bairro);
					$("#cidade").val(dadosRetorno.localidade);
					$("#uf").val(dadosRetorno.uf);
					$("#nr_end").focus();
				} catch (ex) { }
			});
		}
	});

});
