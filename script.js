$(document).ready(function () {
    let turno = "A";
    let tablero = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    let jugando = true;

    $(".celda").click(function () {
        const [fila, columna] = $(this).data("pos").toString().split("-").map(Number);

        if (tablero[fila][columna] === "" && jugando) {
            tablero[fila][columna] = turno;
            $(this).text(turno);
            $(this).addClass(turno === "B" ? "color-x" : "color-o");

            const celdasGanadoras = comprobarGanador(tablero, turno); 
            if (celdasGanadoras) { 
                $("#estado").text(`¡Gana el jugador ${turno}!`);
                jugando = false;

                celdasGanadoras.forEach(([r, c]) => {
                    $(`.celda[data-pos="${r}-${c}"]`).addClass("celda-ganadora");
                });
                return;
            }

            if (tablero.flat().every(c => c !== "")) {
                $("#estado").text("¡Empate!");
                jugando = false;
                return;
            }

            turno = turno === "B" ? "A" : "B";
            $("#estado").text(`Turno de ${turno}`);
        }
    });

    function comprobarGanador(matriz, jugador) {
        const N = 3;

        for (let i = 0; i < N; i++) {
            if (matriz[i][0] === jugador && matriz[i][1] === jugador && matriz[i][2] === jugador) {
                return [[i, 0], [i, 1], [i, 2]]; 
            }
        }

        for (let j = 0; j < N; j++) {
            if (matriz[0][j] === jugador && matriz[1][j] === jugador && matriz[2][j] === jugador) {
                return [[0, j], [1, j], [2, j]]; 
            }
        }


        if (matriz[0][0] === jugador && matriz[1][1] === jugador && matriz[2][2] === jugador) {
            return [[0, 0], [1, 1], [2, 2]]; 
        }

        if (matriz[0][2] === jugador && matriz[1][1] === jugador && matriz[2][0] === jugador) {
            return [[0, 2], [1, 1], [2, 0]]; 
        }

        return false; 
    }

    $("#reiniciar").click(function () {
        tablero = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        turno = "A";
        jugando = true;
        $(".celda").text("");
        $(".celda").removeClass("color-x color-o celda-ganadora"); 
        $("#estado").text("Turno de A");
    });
});
