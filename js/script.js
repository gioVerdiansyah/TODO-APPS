const todos = [];
const RENDER_EVENT = 'render-todo';

document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addTodo();
    });
    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

// document.addEventListener('DOMContentLoaded', function () {});
// Kode di atas adalah sebuah listener yang akan menjalankan kode yang ada didalamnya ketika event DOMContentLoaded dibangkitkan alias ketika semua elemen HTML sudah dimuat menjadi DOM dengan baik.

// Ketika semua elemen sudah dimuat dengan baik, maka kita perlu mempersiapkan elemen form untuk menangani event submit, di mana aksi tersebut dibungkus dan dijalankan oleh fungsi addTodo(), untuk menambahkan todo baru.

// Akan tetapi, elemen form secara default akan memuat ulang secara otomatis website ketika submit. Karena pada latihan ini kita akan menyimpan data dalam memory dan data tersebut akan hilang ketika dimuat ulang, kita perlu memanggil method preventDefault() yang didapatkan dari object event. Dengan demikian, data yang disimpan dalam memory akan terjaga dengan baik.

// Kemudian, buatlah fungsi addTodo() untuk membuat Todo dengan menuliskan beberapa kode di bawah ini.


function addTodo() {
    const textTodo = document.getElementById('title').value;
    const timestamp = document.getElementById('date').value;

    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

// Kode document.getElementById("title").value berfungsi untuk mengambil elemen pada html. Dalam kasus tersebut, kita menangkap element <input> dengan id title dan memanggil properti value untuk mendapatkan nilai yang diinputkan oleh user. Logika yang sama juga dilakukan pada input date.

// Setelah nilai input user disimpan dalam variabel textTodo dan timestamp, kita akan membuat sebuah object dari todo dengan memanggil helper generateTodoObject() untuk membuat object baru. Kemudian, object tersebut disimpan pada array todos menggunakan metode push().

// Setelah disimpan pada array, kita panggil sebuah custom event RENDER_EVENT menggunakan method dispatchEvent(). Custom event ini akan kita terapkan untuk me-render data yang telah disimpan pada array todos.

// Oke, fungsi addTodo() sudah selesai dibuat. Mungkin Anda bingung dan bertanya-tanya mengapa terjadi error pada kode yang dituliskan sebelumnya. Hal tersebut dikarenakan terdapat beberapa fungsi dan variabel yang belum dideklarasikan (dibuat), yaitu generateId() dan generateTodoObject() dan variabel todos & RENDER_EVENT.

// Sebelum menuliskan dua fungsi vital tersebut, mari kita coba pahami dahulu mengenai data dan strukturnya yang akan digunakan. Dari segi struktur data, secara garis besar sudah bisa dilihat pada pemanggilan fungsi generateTodoObject() yang telah Anda tulis tadi. 



// generateTodoObject(generatedID, textTodo, timestamp, false);
// Di sini bisa terlihat bahwa data yang akan kita gunakan adalah id, textTodo, timestamp, & state. Yang mana, apabila disusun dalam bentuk skema data, dan menyesuaikan dengan data yang dibutuhkan oleh aplikasi todo apps akan menjadi seperti berikut.
// {
//     id: "string",
//     task: "string",
//     timestamp: "string",
//     isCompleted: "boolean"
//   }
// Catatan:
// Tipe data yang dijelaskan di atas hanya untuk standar dan preview saja, sebatas hanya untuk mengetahui data apa yang harus diinputkan.



// Setelah mengetahui struktur data yang ada di atas, mari kita aplikasikan dengan menuliskan fungsinya.

function generateId() {
    return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
    return {
        id,
        task,
        timestamp,
        isCompleted
    }
}

// 1.Fungsi generateId() berfungsi untuk menghasilkan identitas unik pada setiap item todo. Untuk menghasilkan identitas yang unik, kita manfaatkan +new Date() untuk mendapatkan timestamp pada JavaScript.

// 2.Fungsi generateTodoObject() berfungsi untuk membuat object baru dari data yang sudah disediakan dari inputan (parameter function), diantaranya id, nama todo (task), waktu (timestamp), dan isCompleted (penanda todo apakah sudah selesai atau belum).



// Semua fungsi yang dibutuhkan sudah selesai ditulis. Untuk memastikan bahwa fungsi diatas bisa berhasil, kita perlu membuat listener dari RENDER_EVENT, dengan menampilkan array todos menggunakan console.log().

document.addEventListener(RENDER_EVENT, function() {
    console.log(todos);
});

// Lalu, jangan lupa untuk memasukkan berkas JavaScript yang telah kita buat tadi ke dalam berkas html seperti ini.



// #

// Dari tampilan item todo tersebut, mari kita ekstrak satu per satu bahwa data apa saja yang ditampilkan.Jika dilihat, terdapat title, timestamp dan check button.Jika sudah memahaminya, kita akan membuat fungsi bernama makeTodo seperti berikut.

// function makeTodo(todoObject) {
//     const textTitle = document.createElement('h2');
//     textTitle.innerText = todoObject.task;

//     const textTimestamp = document.createElement('p');
//     textTimestamp.innerText = todoObject.timestamp;

//     const textContainer = document.createElement('div');
//     textContainer.classList.add('inner');
//     textContainer.append(textTitle, textTimestamp);

//     const container = document.createElement('div');
//     container.classList.add('item', 'shadow');
//     container.append(textContainer);
//     container.setAttribute('id', `todo-${todoObject.id}`);

//     return container;
// }

// Mari kita kupas satu persatu beberapa kode di atas agar mendapatkan pemahaman secara menyeluruh. Mulai dari document.createElement(). Method tersebut berfungsi untuk membuat objek DOM, yakni elemen HTML. Sebagai contoh, jika Anda ingin membuat elemen Heading level-2 (seperti yang dicontoh di atas), Anda bisa mengisi argumentnya dengan nama dari tag tersebut sehingga hasilnya menjadi document.createElement("h2"). Tipe argumen atau parameter yang diperlukan adalah string. Jika ingin membuat elemen lain seperti <div> dan sebagainya, Anda dapat menyesuaikan nama tag yang dituju pada parameter tersebut.


// Kemudian jika dilihat secara desain, teks yang berada di variabel textTimestamp dan textTitle merupakan konten atau child element dari <div> (variabel textContainer). Untuk mencapai ini, kita bisa menggunakan method append() dari variabel textContainer (elemen container) tersebut.

// Karena semua style sudah disediakan berdasarkan class-class selector tertentu pada CSS, kita perlu menerapkan style tersebut secara dinamis dengan menggunakan DOM. Salah satu cara yang bisa dilakukan adalah dengan menggunakan property classList, yang mana kita bisa menambahkan satu atau beberapa class dengan menggunakan classList.add().

// Kemudian, agar setiap todo item mudah di-track dan dikelola, kita perlu memberikan identitas (ID) unik pada setiap elemen todo tersebut. Untuk menetapkan id pada elemen, kita bisa menggunakan setAttributes("id", ""). Agar elemen yang telah kita buat tadi bisa digunakan, kita perlu mengembalikan hasilnya dengan menggunakan return statement.

// Secara umum, jika fungsi tersebut dipanggil dengan parameter data berikut:

// {
//   id: 1,
//   task: "Tugas Android",
//   timestamp: "2021-05-01",
//   isCompleted: false
// }
// Maka, akan mengembalikan elemen berikut: 
// <div class="item shadow">
//   <div class="inner">
//     <h2>Tugas Android</h2>
//     <p>2021-05-01</p>
//   </div>
// </div>

// Agar mendapatkan gambaran yang lebih jelas mengenai fungsi yang telah kita buat tadi (makeTodo), mari kita coba implementasikan fungsi tersebut untuk menampilkan beberapa todo yang tersimpan pada array.

document.addEventListener(RENDER_EVENT, function() {
    // console.log(todos);
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';

    for (const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        uncompletedTODOList.append(todoElement);
    }
});

// Runtutan dari kode di atas adalah pertama elemen container dari todo kita ambil terlebih dahulu dari DOM. Setelah itu, lakukan iterasi pada variabel todos untuk mengambil beberapa data todo yang telah tersimpan.

// Namun, untuk memastikan agar container dari todo bersih sebelum diperbarui, maka kita perlu membersihkannya dengan memanggil property innerHTML = "". Sehingga dengan mengatur property tersebut, tidak terjadi duplikasi data ketika menambahkan elemen DOM yang baru dengan append().

// Setiap iterasi yang dilakukan akan membuat satu elemen DOM, yakni sebagai hasil dari fungsi makeTodo() yang kemudian dimasukkan pada variabel DOM yang sudah ada pada tampilan web (uncompletedTODOList) melalui fungsi append(). Sehingga, elemen tersebut bisa langsung di-render oleh webpage.

// Setelah kode disimpan, jalankan dan cobalah untuk menambahkan sebuah todo. Akhirnya, todo sudah berhasil dibuat!



// Namun, perjalanan kita masih panjang. Beberapa fungsi yang kita definisikan di awal masih belum selesai. Untuk bagian ini, mari kita coba implementasikan fungsi check, uncheck dan menghapus todo.

// Untuk menambahkan fungsi tersebut, silakan tulis beberapa tambahan baris kode berikut pada makeTodo().

function makeTodo(todoObject) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = todoObject.task;

    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = todoObject.timestamp;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimestamp);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `todo-${todoObject.id}`);
    if (todoObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');

        undoButton.addEventListener('click', function() {
            undoTaskFromCompleted(todoObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');

        trashButton.addEventListener('click', function() {
            removeTaskFromCompleted(todoObject.id);
        });

        container.append(undoButton, trashButton);
    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');

        checkButton.addEventListener('click', function() {
            addTaskToCompleted(todoObject.id);
        });

        container.append(checkButton);
    }

    return container;
}
// Mari kita bahas kodenya! Kita ambil salah satu bagian kode, karena pada setiap kode yang ditulis sama satu sama lain.

// const checkButton = document.createElement('button');
// checkButton.classList.add('check-button');

// checkButton.addEventListener('click', function() {
//     addTaskToCompleted(todoObject.id);
// });

// container.append(checkButton);

// Untuk beberapa implementasi kode seperti createElement, classList.add(), dan append() sudah kita bahas sebelumnya. Intinya, beberapa kode tersebut membuat sebuah button dengan mengimplementasikan class check-button. Class tersebut adalah sebuah selector CSS yang terdapat beberapa konfigurasi style di dalamnya.

// Kemudian, agar tombol tersebut bisa diinteraksikan, kita perlu menerapkan event listener “click”, dengan fungsi yang memanggil fungsi lain sesuai dengan konteks dari tombol tersebut. Misalnya, pada tombol ini (checkButton) memanggil addTaskToCompleted, yang mana akan memindahkan todo dari rak “Yang harus dilakukan” ke rak “Yang sudah dilakukan”.

// Tombol lain, seperti undoButton & trashButton, juga menerapkan hal yang sama, di mana memanggil fungsi undoTaskFromCompleted dan removeTaskFromCompleted. Yang mana masing - masing akan memindahkan todo dari selesai ke belum selesai, dan menghapus todo.

// Agar fungsi check button bisa berfungsi, maka kita perlu menuliskan fungsi addTaskToCompleted. Silakan tulis kode berikut ini :

function addTaskToCompleted(todoId) {
    const todoTarget = findTodo(todoId);

    if (todoTarget == null) return;

    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

// Seperti yang sudah dijelaskan sebelumnya, fungsi ini digunakan untuk memindahkan todo dari rak “Yang harus dilakukan” ke “Yang sudah dilakukan”. Prinsipnya adalah merubah state isCompleted dari sebelumnya false ke true, kemudian panggil event RENDER_EVENT untuk memperbarui data yang ditampilkan.

// Kemudian, fungsi ini memanggil fungsi baru, yaitu findTodo, yang mana berfungsi untuk mencari todo dengan ID yang sesuai pada array todos. Agar tidak terjadi error (undefined), maka tuliskan kodenya seperti berikut ini :

function findTodo(todoId) {
    for (const todoItem of todos) {
        if (todoItem.id === todoId) {
            return todoItem;
        }
    }
    return null;
}

// Setelah selesai menambahkan fungsi di atas, mari kita beralih ke memodifikasi event listener render, agar menampilkan data yang sesuai, misalnya todo yang belum dikerjakan akan diletakkan pada “Yang harus dibaca”.

// Silakan ubah kode event listener tersebut menjadi seperti ini :

document.addEventListener(RENDER_EVENT, function() {
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';

    for (const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        if (!todoItem.isCompleted) {
            uncompletedTODOList.append(todoElement);
        }
    }
});

// Oke, disini perubahan yang kita lakukan ialah memasang kondisi if statement untuk mem-filter hanya todo “Yang harus dibaca” saja lah yang perlu ditampilkan.



// #

// Fokuslah pada rak “Yang sudah dilakukan”, terlihat bahwa secara desain kurang lebih sama dengan rak “Yang belum dibaca”, dengan hanya merubah sedikit pada heading. Karena desainnya sama, mari kita salin dan tempelkan kode tersebut (yang ditebalkan) pada baris kontainer selanjutnya, sehingga, untuk kode menjadi seperti ini :

// Untuk sekarang, tampilan rak “Yang sudah dilakukan” sudah bisa ditampilkan, namun todo masih belum dapat ditampilkan pada rak tersebut. Agar bisa ditampilkan, maka kita perlu memodifikasi kode pada event listener kembali, tujuannya,  ketika todo tersebut sudah masuk dalam status selesai (isCompleted == true) akan ditampilkan pada tampilan web.

// Silakan sesuaikan kode pada event listener RENDER_EVENT menjadi seperti berikut.

document.addEventListener(RENDER_EVENT, function() {
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';

    const completedTODOList = document.getElementById('completed-todos');
    completedTODOList.innerHTML = '';

    for (const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        if (!todoItem.isCompleted)
            uncompletedTODOList.append(todoElement);
        else
            completedTODOList.append(todoElement);
    }
});

// Mari kita bahas tambahan kode tersebut. Di sini kita menambahkan sebuah variabel DOM baru yang menampung kontainer dari Todo yang sudah selesai.

// Agar tidak terjadi duplikasi oleh item yang ada di tampilan ketika memperbarui data todo yang ditampilkan, maka hapus terlebih dahulu elemen sebelumnya (yang sudah ditampilkan) dengan perintah innerHTML = “”.

// Kemudian, pada perulangan kita juga menambahkan cabang logika else statement baru dengan kode yang digunakan untuk menambahkan todoElement ke completedTODOList.

// Sehingga, apabila ada todo yang sudah ditandai selesai, maka akan masuk ke cabang else statement yang mana nantinya akan menampilkan todoElement pada halaman web.

// Oke, agar bisa terdapat gambaran mengenai apa yang sudah dijelaskan, cobalah test aplikasi todo yang dibuat.



// Sekarang, todo yang sudah selesai sudah bisa terlihat dengan baik, namun untuk saat ini todo yang sudah diselesaikan masih belum bisa dihapus dan belum dapat dipindahkan (masih error). Mari kita coba untuk menambahkan fungsi tersebut.

// Masih ingatkah dengan kode berikut yang ditambahkan sebelumnya (yang ditebakan)?

// if (todoObject.isCompleted) {
//   // ...

//   undoButton.addEventListener('click', function () {
//     undoTaskFromCompleted(todoObject.id);
//   });

//   // ...
//   trashButton.addEventListener('click', function () {
//     removeTaskFromCompleted(todoObject.id);
//   });

//   // ...
// }
// Nah, untuk saat ini, pada fungsi yang ditebalkan tersebut masih error dan belum dapat dipanggil. Tugas kita saat ini adalah menuliskan kedua fungsi tersebut, agar fungsi memindahkan todo yang sudah selesai dan menghapus todo bisa berjalan dengan baik. Langsung saja, buatlah kedua fungsi baru dan ketikkanlah kode di dalamnya sesuai dengan kode berikut.

function removeTaskFromCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);

    if (todoTarget === -1) return;

    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}


function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);

    if (todoTarget == null) return;

    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

// Mari kita bahas satu persatu, dimulai dari undoTaskFromCompleted. Fungsi ini sebenarnya mirip dengan addTaskToCompleted, namun perbedaannya adalah pada state isCompleted yang diubah nilainya ke false, hal ini bertujuan agar todo task yang sebelumnya completed (selesai), bisa dipindah menjadi incomplete (belum selesai).

// Kemudian untuk removeTaskFromCompleted, fungsi ini akan menghapus Todo berdasarkan index yang didapatkan dari pencarian Todo dengan menggunakan findTodoIndex(). Apabila pencarian berhasil, maka akan menghapus todo tersebut menggunakan fungsi splice() yang disediakan oleh JavaScript.

// Setelah selesai menerapkan kode tersebut, cobalah untuk test aplikasinya (memindahkan todo dan menghapus todo).


// Jika melihat error, error tersebut terjadi karena findTodoIndex() masih belum diimplementasikan. Karena JavaScript tidak menyediakan fungsi tersebut, maka kita harus menulis fungsi tersebut secara manual.

// Silakan tambahkan kode berikut pada file JavaScript :
function findTodoIndex(todoId) {
    for (const index in todos) {
        if (todos[index].id === todoId) {
            return index;
        }
    }

    return -1;
}


// local storange
// Intisari dari penambahan kode ini adalah menambahkan pemanggilan fungsi saveData() pada setiap fungsi kelola data. Sehingga, ketika data pada array todos ada perubahan, maka diharapkan perubahan tersebut dapat tersimpan pada storage secara langsung, seperti mekanisme flow yang sudah kita buat sebelumnya.

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(todos);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

// Untuk memastikan bahwa browser yang dipakai memang mendukung localStorage, maka sebaiknya kita periksa terlebih dahulu sebelum mulai eksekusi kode simpan ke storage. Di sini, kita menggunakan fungsi pembantu isStorageExist() yang mengembalikan nilai boolean untuk menentukan apakah memang benar didukung atau tidak.

// Jika memang mendukung, maka kita akan mengeksekusi beberapa tahapan berikut (sesuai dengan kode di atas) untuk menyimpan data.

// Dikarenakan localStorage hanya mendukung tipe data teks, maka diperlukan konversi data object ke string agar bisa disimpan. Di sini kita gunakan JSON.stringify() untuk konversinya.
// Menyimpan data ke storage sesuai dengan key yang kita tentukan. Dalam hal ini key yang kita gunakan adalah "TODO_APPS" dalam variabel STORAGE_KEY.
// Untuk mempermudah debugging atau tracking ketika terjadi perubahan data, kita akan memanggil sebuah custom event baru yang bernama "saved-todo" dalam variabel SAVED_EVENT.
// Masih ada beberapa kode yang perlu ditambahkan, yakni STORAGE_KEY, SAVED_EVENT & isStorageExist(). Silakan tuliskan kode berikut ini pada file JavaScript.

const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';

function isStorageExist() /* boolean */ {
    if (typeof(Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false; /*!!!*/
    }
    return true;
}

// Kemudian, agar dapat memudahkan dalam mengetahui bahwa pada setiap perubahan data bisa secara sukses memperbarui data pada storage, kita bisa menerapkan listener dari event SAVED_EVENT. Kemudian, di dalam event listener tersebut kita bisa memanggil getItem(KEY) untuk mengambil data dari localStorage, lalu bisa kita tampilkan secara sederhana menggunakan console log.

document.addEventListener(SAVED_EVENT, function() {
    console.log(localStorage.getItem(STORAGE_KEY));
});



// membuat web app menampilkan data dari localStorage ketika halaman pertama kali dimuat.  Caranya, kita buat fungsi loadDataFromStorage() dengan dengan menjalankan strategi sebagai berikut:

// Ambil data dari localStorage, data ini akan disediakan dalam format teks JSON.
// Kemudian parse data JSON tadi menjadi sebuah object.
// Lalu, masukkan satu persatu data dari object ke array todos.
// Agar bisa diperbarui pada tampilan, panggil Event RENDER_EVENT.


function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const todo of data) {
            todos.push(todo);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

// Kemudian, kita perlu panggil fungsi tersebut pada saat semua elemen HTML sudah selesai dimuat menjadi DOM. Untuk itu, pastikan kode yang ada pada listener DOMContentLoaded menjadi seperti ini, dengan menambahkan beberapa kode yang ditebalkan.