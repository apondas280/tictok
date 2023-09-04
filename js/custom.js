var move = 0;
var select = 0;
var p1_move_set = [];
var p2_move_set = [];

$(document).ready(function () {
    $('.tile').click(function (e) {
        e.preventDefault();

        var move = $(this).attr('id');
        select += 1;
        if (select % 2 == 1) {
            var icon = 'fa-circle';
            p1_move_set.push(move);
            if (p1_move_set.length >= 3) {
                var p1_status = processMove('Sham', p1_move_set);
                if (p1_move_set.length > 3) {
                    if (!p1_status) {
                        var p1_parent = $('#' + p1_move_set[0]);
                        p1_parent.children('.' + icon).addClass('d-none');
                        p1_parent.css('pointerEvents', 'auto');
                        p1_move_set.shift();
                    }
                }
            }
        } else {
            var icon = 'fa-xmark';
            p2_move_set.push(move);
            if (p2_move_set.length >= 3) {
                var p2_status = processMove('Ram', p2_move_set);
                if (p2_move_set.length > 3) {
                    if (!p2_status) {
                        var p2_parent = $('#' + p2_move_set[0]);
                        p2_parent.children('.' + icon).addClass('d-none');
                        p2_parent.css('pointerEvents', 'auto');
                        p2_move_set.shift();
                    }
                }
            }
        }
        $(this).children('.' + icon).removeClass('d-none');
        $(this).css('pointerEvents', 'none');
    });

    $('#rld-btn').click(function (e) {
        location.reload(true);
    });
});

function processMove(player, moveSet) {
    var win_combination = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];
    for (let x in win_combination) {
        var status = compare_move(moveSet, win_combination[x]);
        if (status) {
            $('.tile').css({
                'pointerEvents': 'none',
                'opacity': '.1',
            });
            $('.alert strong').text('Congratulations! ' + player + ' wins.');
            $('.alert').removeClass('d-none');
            return status;
        }
    }
    return status;
}
function compare_move(one, two) {
    var increment = 0;
    for (let i = 0; i < one.length; i++) {
        for (let j = 0; j < two.length; j++) {
            if (one[i] == two[j]) {
                increment++;
                if (increment == 3) {
                    return true;
                }
            }
        }
    }
    return false;
}