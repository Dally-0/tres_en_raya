$(document).ready(function () {
    let turno = "X";
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

            $(this).addClass(turno === "X" ? "color-x" : "color-o");

            if (comprobarGanador(tablero, turno)) {
                $("#estado").text(`¡${turno} ha ganado!`);
                jugando = false;
                return;
            }

            if (tablero.flat().every(c => c !== "")) {
                $("#estado").text("¡Empate!");
                jugando = false;
                return;
            }

            turno = turno === "X" ? "O" : "X";
            $("#estado").text(`Turno de ${turno}`);
        }
    });

    function comprobarGanador(matriz, jugador) {
        const N = 3;
        for (let i = 0; i < N; i++) {
            if (matriz[i][0] === jugador && matriz[i][1] === jugador && matriz[i][2] === jugador) {
                return true;
            }
        }
        for (let j = 0; j < N; j++) {
            if (matriz[0][j] === jugador && matriz[1][j] === jugador && matriz[2][j] === jugador) {
                return true;
            }
        }
        if (matriz[0][0] === jugador && matriz[1][1] === jugador && matriz[2][2] === jugador) {
            return true;
        }
        if (matriz[0][2] === jugador && matriz[1][1] === jugador && matriz[2][0] === jugador) {
            return true;
        }
        return false;
    }

    $("#reiniciar").click(function () {
        tablero = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        turno = "X";
        jugando = true;
        $(".celda").text("");
        $(".celda").removeClass("color-x color-o");
        $("#estado").text("Turno de X");
    });
});