// Mencari elemen terbesar dalam array
function findMin(array) {
    var min = bijiAwal * 14;
    var minidx;
    for (i = 0; i < array.length; i++) {
        if (array[i] < min) {
            min = array[i];
            minidx = i;
        }
    }

    return minidx;
}

// Fungsi update papan
function updatePapan() {
    for (i = 0; i < 16; i++) {
        if (papan.length != 0) {
            papan[i] = holes[i].num;
        } else {
            papan.push(holes[i].num);
        }
    }
}

// Fungsi mencari array index yang berhenti dilumbung AI
function findIdxAI() {
    var allIdx = [];
    var jml;
    lflag = 0;

    for (var j = 0; j < 7; j++) {
        updatePapan();
        i = 1;
        jml = papan[j];
        papan[j] = 0;
        var idxtemp = j;

        while (jml != 0) {
            var nidx = idxtemp + i;

            while (nidx > 15) {
                nidx -= 16;
            }

            if (nidx == 15) {
                nidx++;
                i++;
                jml++;
            } else {

                papan[nidx]++;

                i++;
                if (i > jml) {
                    if (nidx == 7) {
                        lflag = 1;
                        jml = 0;
                        // selesai di lumbung
                    } else {
                        if (papan[nidx] > 1) {
                            i = 1;
                            jml = papan[nidx];
                            papan[nidx] = 0;
                            idxtemp = nidx;
                            // ambil lagi
                        } else {
                            if (nidx < 7) {
                                if (nidx == 0) {
                                    sum = papan[14] + 1;
                                    papan[7] += sum;
                                }
                                if (nidx == 1) {
                                    sum = papan[13] + 1;
                                    papan[7] += sum;
                                }
                                if (nidx == 2) {
                                    sum = papan[12] + 1;
                                    papan[7] += sum;
                                }
                                if (nidx == 3) {
                                    sum = papan[11] + 1;
                                    papan[7] += sum;
                                }
                                if (nidx == 4) {
                                    sum = papan[10] + 1;
                                    papan[7] += sum;
                                }
                                if (nidx == 5) {
                                    sum = papan[9] + 1;
                                    papan[7] += sum;
                                }
                                if (nidx == 6) {
                                    sum = papan[8] + 1;
                                    papan[7] += sum;
                                }
                                jml = 0;
                                // selesai dengan nembak
                            } else {
                                jml = 0;
                                // selesai
                            }
                        }
                    }
                }
            }
        }

        if (lflag == 1) {
            allIdx.push(j);
            lflag = 0;
            updateAi(j, ((allbiji - papan[7]) / allbiji).toFixed(1));
        } else {
            updateAi(j, (papan[7] / allbiji).toFixed(1));
        }
    }
    return allIdx;
}

// Fungsi AI move untuk mengubah papan
function doMoveAI(index) {
    i = 1;
    var jml = papan[index];
    papan[index] = 0;
    var idxtemp = index;

    while (jml != 0) {
        var nidx = idxtemp + i;

        while (nidx > 15) {
            nidx -= 16;
        }

        if (nidx == 15) {
            nidx++;
            i++;
            jml++;
        } else {

            papan[nidx]++;

            i++;
            if (i > jml) {
                if (nidx == 7) {
                    jml = 0;
                    // selesai di lumbung
                } else {
                    if (papan[nidx] > 1) {
                        i = 1;
                        jml = papan[nidx];
                        papan[nidx] = 0;
                        idxtemp = nidx;
                        // ambil lagi
                    } else {
                        if (nidx < 7) {
                            if (nidx == 0) {
                                sum = papan[14] + 1;
                                papan[7] += sum;
                            }
                            if (nidx == 1) {
                                sum = papan[13] + 1;
                                papan[7] += sum;
                            }
                            if (nidx == 2) {
                                sum = papan[12] + 1;
                                papan[7] += sum;
                            }
                            if (nidx == 3) {
                                sum = papan[11] + 1;
                                papan[7] += sum;
                            }
                            if (nidx == 4) {
                                sum = papan[10] + 1;
                                papan[7] += sum;
                            }
                            if (nidx == 5) {
                                sum = papan[9] + 1;
                                papan[7] += sum;
                            }
                            if (nidx == 6) {
                                sum = papan[8] + 1;
                                papan[7] += sum;
                            }
                            jml = 0;
                            // selesai dengan nembak
                        } else {
                            jml = 0;
                            // selesai
                        }
                    }
                }
            }
        }
    }
    updatePapan2();
}

// Fungsi update papan 2
function updatePapan2() {
    for (i = 0; i < 16; i++) {
        if (papan2.length != 0) {
            papan2[i] = papan[i];
        } else {
            papan2.push(papan[i]);
        }
    }
}

// Mencoba semua index player dengan lumbungnya
function findIdxP() {
    var jml;
    var max = papan2[15];

    for (var j = 0; j < 7; j++) {
        updatePapan2();
        i = 1;
        jml = papan2[j];
        papan2[j] = 0;
        var idxtemp = j;

        while (jml != 0) {
            var nidx = idxtemp + i;

            while (nidx > 15) {
                nidx -= 16;
            }

            if (nidx == 7) {
                nidx++;
                i++;
                jml++;
            } else {

                papan2[nidx]++;

                i++;
                if (i > jml) {
                    if (nidx == 15) {
                        jml = 0;
                        // selesai di lumbung
                    } else {
                        if (papan2[nidx] > 1) {
                            i = 1;
                            jml = papan2[nidx];
                            papan2[nidx] = 0;
                            idxtemp = nidx;
                            // ambil lagi
                        } else {
                            if (nidx > 7) {
                                if (nidx == 14) {
                                    sum = papan2[0] + 1;
                                    papan2[15] += sum;
                                }
                                if (nidx == 13) {
                                    sum = papan2[1] + 1;
                                    papan2[15] += sum;
                                }
                                if (nidx == 12) {
                                    sum = papan2[2] + 1;
                                    papan2[15] += sum;
                                }
                                if (nidx == 11) {
                                    sum = papan2[3] + 1;
                                    papan2[15] += sum;
                                }
                                if (nidx == 10) {
                                    sum = papan2[4] + 1;
                                    papan2[15] += sum;
                                }
                                if (nidx == 9) {
                                    sum = papan2[5] + 1;
                                    papan2[15] += sum;
                                }
                                if (nidx == 8) {
                                    sum = papan2[6] + 1;
                                    papan2[15] += sum;
                                }
                                jml = 0;
                                // selesai dengan nembak
                            } else {
                                jml = 0;
                                // selesai
                            }
                        }
                    }
                }
            }
        }

        // Jika lumbung > max, max -> lumbung
        if (max < papan2[15]) {
            max = papan2[15];
        }
    }
    return max;
}