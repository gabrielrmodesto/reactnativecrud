import { create}  from 'apisauce';

const api = create({
	baseUrl: "https://colegasmedicos.com.br/api"
});

api.addResponseTransform(response => {
	if(!response.ok) throw response;
});
export default api;