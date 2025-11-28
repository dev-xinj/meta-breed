const fetchData = async () => {
      const response = await fetch("https://graph.facebook.com/v24.0/807529795786209/posts?"+new URLSearchParams({
          fields: "id,message,from,created_time,permalink_url,full_picture",
        }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Bearer EAAMZAgRascpkBQM6DbZCO4d27MIMZAaPFdo5tY85wjD6G2DbNf9VMzApmwKQGGwWv9HRUzcdb27wG89JtM85ZBKw7R7FD1DInfobSevZACgjxo3ILdVvP3ZAuoOkKIxeKzdNJxenYCpKh8kpl554W0p8W93VD4faWIM04Q5s6AZBN2OJFHbDpaNZAFaVeodIjsyZBgCK9tE14dm47krryoJ88hGThNqZCd7ZCMsOeD6AfImfrxCoy3kvaSNU9sZD",
          

        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      return response;
    };