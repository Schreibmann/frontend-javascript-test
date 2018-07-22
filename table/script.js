function main() {
  let table = new Table();
  table.initToolbar();
  table.initHead();
}

function Table() {
  this.reverseDir = false; // Для определения обратного направления сортировки
  this.lastSorted = ""; // Последний отсортированный столбец
  this.fullData = []; // Данные из JSON
  this.visibleData = []; // Данные для отображения
  this.searchedData = []; // Выборка из поиска

  this.getData = range => {
    // Загрузка данных
    const URL = {
      small: "small.json",
      big: "big.json"
    };

    try {
      $.getJSON(URL[range], result => {
        navigation.innerHTML = "Данные загружаются..";
        this.searchedData = this.fullData = result;
      })
        .done(() => {
          this.drawContent(
            this.searchedData,
            parseInt(pages.options[pages.selectedIndex].value),
            0
          );
          this.drawPagination(
            this.searchedData,
            parseInt(pages.options[pages.selectedIndex].value)
          );
        })
        .fail(() => {
          alert("Ошибка загрузки данных! Проверьте интернет соединение.");
        });
    } catch (e) {
      alert("Ошибка " + e.name + ":" + e.message + "\n" + e.stack);
    }
  };

  this.initToolbar = () => {
    // Инициализация компонентов тулбара
    searchBtn.onclick = () => this.search();
    bigDataBtn.onclick = () => this.getData("big");
    smallDataBtn.onclick = () => this.getData("small");
    pages.onchange = () => {
      // Перерисовка видимого содержимого талицы при смене кол-ва страниц для вывода
      this.drawContent(
        this.searchedData,
        parseInt(pages.options[pages.selectedIndex].value),
        0
      );
      this.drawPagination(
        this.searchedData,
        parseInt(pages.options[pages.selectedIndex].value)
      );
    };
  };

  this.initHead = () => {
    // Инициализация заголовков (сортировка, подсветка направления сортировки)
    document.querySelectorAll(".thead>th").forEach(column => {
      column.addEventListener("click", e => {
        this.sortCol(column.getAttribute("name"));
        column.querySelector(".arrow").innerHTML = this.reverseDir ? "⇓" : "⇑";
      });

      column.addEventListener("mouseenter", e => {
        column.querySelector(".arrow").style.color = "red";
      });
      column.addEventListener("mouseleave", e => {
        column.querySelector(".arrow").style.color = "grey";
        column.querySelector(".arrow").innerHTML = "⇵";
      });
    });
  };

  this.sortCol = colName => {
    // Сортировка кликнутого столбца
    this.visibleData.sort((first, next) => {
      if (colName === this.lastSorted && this.reverseDir === true) {
        // По убыванию
        if (first[colName] > next[colName]) {
          return -1;
        }
        if (first[colName] < next[colName]) {
          return 1;
        }
        return 0;
      } else {
        // По возрастанию
        if (first[colName] > next[colName]) {
          return 1;
        }
        if (first[colName] < next[colName]) {
          return -1;
        }
        return 0;
      }
    });

    if (this.lastSorted !== colName && this.reverseDir === true) {
      // Условие для избежания несрабатывания сортировки при переходе от одного столбца к другому
      this.reverseDir = this.reverseDir;
    } else {
      this.reverseDir = !this.reverseDir;
    }
    this.lastSorted = colName; // Запоминаем кликнутый столбец
    this.drawContent(); // Перерисовываем
  };

  this.search = () => {
    // Поиск
    let searchVal = document.getElementById("search").value; // Подстрока для поиска
    const props = ["id", "firstName", "lastName", "email", "phone"]; // Св-ва, по которым ищем
    this.searchedData = this.fullData.filter(obj => {
      // Формируем массив данных, удовлетворяющих условиям поиска
      for (let i = 0; i < 5; i++) {
        let propVal = obj[props[i]].toString();
        if (propVal.indexOf(searchVal) > -1) {
          return true;
        }
      }
    });

    let pagesCount = parseInt(pages.options[pages.options.selectedIndex].value); // Кол-во страниц для отображения
    this.drawContent(this.searchedData, pagesCount, 0); // Выводим первую страницу
    this.drawPagination(this.searchedData, pagesCount); // Пагинация для просмотра остальных данных из поиска
  };

  this.drawContent = (data, rowCount, pos) => {
    // Вывод одной страницы данных
    if (
      typeof data !== "undefined" &&
      typeof rowCount !== "undefined" &&
      typeof pos !== "undefined"
    ) {
      this.visibleData = [];
      if (data.length <= rowCount || data.length - pos <= rowCount) {
        for (let i = pos; i < data.length; i++) {
          this.visibleData.push(data[i]);
        }
      } else
        for (let i = pos; i < pos + rowCount; i++) {
          this.visibleData.push(data[i]);
        }
    }

    while (tbody.firstChild) {
      // Удаляем содержимое тела таблицы
      tbody.removeChild(tbody.firstChild);
    }

    this.visibleData.map(elem => {
      // Загружаем новое содржимое
      let row = document.createElement("TR");
      let td1 = document.createElement("TD");
      td1.appendChild(document.createTextNode(elem.id));
      let td2 = document.createElement("TD");
      td2.appendChild(document.createTextNode(elem.firstName));
      let td3 = document.createElement("TD");
      td3.appendChild(document.createTextNode(elem.lastName));
      let td4 = document.createElement("TD");
      td4.appendChild(document.createTextNode(elem.email));
      let td5 = document.createElement("TD");
      td5.appendChild(document.createTextNode(elem.phone));

      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      row.appendChild(td4);
      row.appendChild(td5);

      row.setAttribute("onmouseover", "this.style.backgroundColor='#f8f8ff'"); // Подсветка записей
      row.setAttribute("onmouseout", "this.style.backgroundColor='#fff'");

      row.addEventListener("click", () => {
        // Вывод дополнительной информации
        let userInfo = `<p>Выбран пользователь: <b>${elem.firstName} ${
          elem.lastName
        }</b></p><p>Описание:</p><textarea cols=40 rows=8 readonly>${
          elem.description
        }</textarea><p>Адрес проживания: <b>${
          elem.adress.streetAddress
        }</b></p><p>Город: <b>${
          elem.adress.city
        }</b></p><p>Провинция/штат: <b>${
          elem.adress.state
        }</b></p><p>Индекс: <b>${elem.adress.zip}</b></p>`;
        document.getElementById("user-info").innerHTML = userInfo;
      });

      tbody.appendChild(row);
    });
  };

  this.drawPagination = (data, rowCount) => {
    // Вывод пагинации
    navigation.innerHTML = "";
    for (let i = 0; i < data.length / rowCount; i++) {
      // Вычисляем кол-во страниц
      var page = document.createElement("a");
      page.appendChild(document.createTextNode(`[${i + 1}]`)); // Нумерация страниц с первой, а не нулевой
      page.onclick = () => this.drawContent(data, rowCount, i * rowCount); // Вывод определенного кол-ва записей с определенной позиции (из массива searchedData)
      page.setAttribute("onmouseover", "this.style.color='red'"); // Подсветка
      page.setAttribute("onmouseout", "this.style.color='black'");
      page.style.cursor = "pointer";
      navigation.appendChild(page);
    }
  };
}

window.onload = main;
