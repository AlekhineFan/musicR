import http from "../http-common.js/index";

class DataService {
  findAll() {
    return http.get("/artists");
  }
  findOne(id) {
    console.log("searching for id:", id);
    return http.get(`/artist/${id}`);
  }
  findOneByName(name) {
    return http.get(`/artists?name=${name}`);
  }
  create(data) {
    return http.post("/artists", JSON.stringify(data));
  }
  updateOne(id, data) {
    return http.put(`/artists/${id}`, data);
  }
  deleteOne(id) {
    return http.delete(`/artists/${id}`);
  }
  deleteAll() {
    return http.delete("/artists");
  }
}

export default new DataService();
