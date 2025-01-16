---
title: Game Project ; Guesstimation
date: 2025-01-09
categories: [Project]
tags: [project]     # TAG names should always be lowercase
media_subpath: /assets/media/
description: Guesstimation adalah proyek game berbasis terminal yang dirancang untuk mengasah logika dan kemampuan pemrograman dasar.
---

{% include embed/youtube.html id='EnzKZTqDymg' %}

## Tentang Guesstimation
<b>Guesstimation</b> adalah game berbasis terminal yang saya kembangkan sebagai bagian dari tugas mata kuliah di semester pertama. Game ini bertujuan untuk mengasah kemampuan pemain dalam menebak angka yang diacak oleh program dalam jumlah percobaan tertentu.

Fitur utama dari <b>Guesstimation</b> meliputi:
1. <b>Pilihan Tingkat Kesulitan</b>: Pemain dapat memilih dari empat tingkat kesulitan, yaitu Easy (0-50), Middle (0-100), Hard (0-500), dan Expert (0-1000).
2. <b>Sistem Skor</b>: Skor dihitung berdasarkan kecepatan dan ketepatan dalam menebak angka.
3. <b>Mode Ulang Permainan</b>: Pemain dapat mengulangi permainan dengan mudah melalui tombol <i>Mulai Ulang</i>
4. <b>Antarmuka Pengguna Sederhana</b>: Tampilan minimalis dengan panduan input yang jelas, sehingga mudah digunakan oleh semua kalangan.

## Teknologi yang Digunakan
Tugas ini dibangun menggunakan bahasa pemrograman <b>Python</b> untuk menangani logika permainan dan pengelolaan data secara dinamis. Saya juga menggunakan <b>Streamlit</b> untuk menampilkan antarmuka pengguna yang sederhana dan interaktif. Pyhton dipilih karena kemudahan penggunaannya serta dukungannya terhadap berbagai pustaka yang mempermudah pengembangan aplikasi berbasis terminal.

 Melalui pengembangan <b>Guesstimation</b> saya belajar tentang penggunaan pustaka seperti random untuk ``random`` untuk menghasilkan angka acak serta fitur-fitur interaktif dari Streamlit untuk meningkatkan pengalaman pengguna. Berikut cuplikan kode dari proyek ini:

``` 
import random
import streamlit as st

# Judul Permainan
st.title("Guesstimation")

# Pilih Menu
menu = st.radio(
    "Pilih Menu Permainan:",
    ("Easy (0-50)", "Middle (0-100)", "Hard (0-500)", "Expert (0-1000)", "Exit"),
)

# Skor Tertinggi (Persistent)
if "score_tertinggi" not in st.session_state:
    st.session_state.score_tertinggi = 0

# Proses Permainan
if menu != "Exit":
    batas = 50 if "Easy" in menu else 100 if "Middle" in menu else 500 if "Hard" in menu else 1000
    skor_awal = 1000 if batas == 50 else 2000 if batas == 100 else 3000 if batas == 500 else 5000

    # Simpan Angka Acak dan Skor (Persistent)
    if "angka_acak" not in st.session_state or st.button("Mulai Ulang"):
        st.session_state.angka_acak = random.randint(0, batas)
        st.session_state.score = skor_awal

    # Form Input Angka
    with st.form("tebakan_form"):
        tebakan = st.number_input(f"Masukkan angka tebakan Anda (0 - {batas}):", 0, batas, step=1, key="input_tebakan")
        submit = st.form_submit_button("Submit")

    # Proses Validasi Tebakan
    if submit:
        if tebakan < st.session_state.angka_acak:
            st.write("Maaf, angka tebakan Anda terlalu rendah.")
            st.session_state.score -= 20
        elif tebakan > st.session_state.angka_acak:
            st.write("Maaf, angka tebakan Anda terlalu tinggi.")
            st.session_state.score -= 20
        else:
            st.write(f"Selamat! Tebakan Anda benar, yaitu {st.session_state.angka_acak}.")
            st.write(f"Skor Anda: {st.session_state.score}")

            # Perbarui Skor Tertinggi
            if st.session_state.score > st.session_state.score_tertinggi:
                st.session_state.score_tertinggi = st.session_state.score

            st.write(f"Skor Tertinggi: {st.session_state.score_tertinggi}")
            st.session_state.angka_acak = random.randint(0, batas)  # Mulai Angka Baru Otomatis

    # Tampilkan Skor Saat Ini dan Skor Tertinggi
    st.write(f"Skor Saat Ini: {st.session_state.score}")
    st.write(f"Skor Tertinggi: {st.session_state.score_tertinggi}")

else:
    st.write("Permainan selesai. Terima kasih telah bermain!")
```

## Penutup ##
Proyek **Guesstimation** ini telah menjadi pengalaman yang sangat berharga dalam meingkatkan kemampuan saya dalam pemrograman menggunakan **Python**. Dengan menyelesaikan proyek ini, saya semakin memahami pentingnya logika pemrograman dan struktur data dalam pengembangan aplikasi. Saya berharap game ini dapat memberikan pengalaman bermain yang menyenangkan sekaligus edukatif bagi para pemainnya.