import React, { useState } from "react";
import VerticalDashboard from "../components/dashboard";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";

function Agregar() {
  const tipoTrabajoOptions = [
    "Reparación mecánica",
    "Reparación de chapa y pintura",
    "Revisión",
  ];
  const token = Cookies.get();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      Propietario: "",
      Modelo: "",
      Placas: "",
      Marca: "",
      tipoTrabajo: "",
      descripcion: "",
    },
    onSubmit: async (values, actions) => {
      try {
        setIsLoading(true);

        const { Propietario, Modelo, Placas, Marca, tipoTrabajo, descripcion } =
          values;

        // primero se agrega el vehiculo
        const res = await axios.post(
          "https://localhost:3001/vehiculos",
          {
            propietario: Propietario,
            marca: Marca,
            modelo: Modelo,
            placas: Placas,
          },
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );

        // posteriormente se agrega el servicio
        const mappedTipoTrabajo = tipoTrabajoOptions.indexOf(tipoTrabajo);
        await axios.post(
          "https://localhost:3001/trabajos",
          {
            descripcion: descripcion,
            tipo: mappedTipoTrabajo,
            vehiculo: res.data.idVehiculo,
          },
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );

        setIsLoading(false);
        actions.resetForm();
        alert("Datos agregados correctamente");
      } catch (error) {
        console.error("Error adding data:", error);
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
        <VerticalDashboard />

        <div className="flex flex-col flex-grow items-center mx-auto ">
          <h1 className="p-12 pr-[750px] font-semibold text-4xl">
            Agregar Servicio
          </h1>

          <div className="">
            <h2 className="text-gray-700 text-3xl font-semibold mb-5">
              Datos del vehiculo
            </h2>
            <form
              className="w-[500px] h-[600px]"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-row">
                <div className="mb-4 pr-5">
                  <label
                    className="block text-gray-700 text-xl font-semibold mb-2"
                    htmlFor="propietario"
                  >
                    Propietario
                  </label>
                  <input
                    type="text"
                    name="Propietario"
                    id="propietario"
                    className="border-2 border-blue-950 rounded-lg w-full py-1 px-2"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.Propietario}
                  />
                </div>
                <div className="mb-4 pr-5">
                  <label
                    className="block text-gray-700 text-xl font-semibold mb-2"
                    htmlFor="modelo"
                  >
                    Modelo
                  </label>
                  <input
                    type="text"
                    name="Modelo"
                    id="modelo"
                    className="border-2 border-blue-950 rounded-lg w-full py-1 px-2"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.Modelo}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-xl font-semibold mb-2"
                    htmlFor="placas"
                  >
                    Placas
                  </label>
                  <input
                    type="text"
                    name="Placas"
                    id="placas"
                    className="border-2 border-blue-950 rounded-lg w-full py-1 px-2"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.Placas}
                  />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="mb-4 pr-5">
                  <label
                    className="block text-gray-700 text-xl font-semibold mb-2"
                    htmlFor="marca"
                  >
                    Marca
                  </label>
                  <input
                    type="text"
                    name="Marca"
                    id="marca"
                    className="border-2 border-blue-950 rounded-lg w-full py-1 px-2"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.Marca}
                  />
                </div>
              </div>
              <h3 className="text-gray-700 text-3xl font-semibold mb-5 mt-5">
                Datos del servicio
              </h3>
              <div className="flex flex-row">
                <div className="mb-4 pr-5">
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-xl font-semibold mb-2"
                      htmlFor="tipoTrabajo"
                    >
                      Tipo
                    </label>
                    <select
                      id="tipoTrabajo"
                      name="tipoTrabajo"
                      className="border-2 border-blue-950 rounded-lg py-2 px-2"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.tipoTrabajo}
                    >
                      <option
                        value=""
                        className="font-semibold text-gray-700 text-md"
                      >
                        Seleccionar tipo de trabajo
                      </option>
                      <option
                        value="Reparación mecánica"
                        className="font-semibold text-gray-700 text-md"
                      >
                        Reparación mecánica
                      </option>
                      <option
                        value="Reparación de chapa y pintura"
                        className="font-semibold text-gray-700 text-md"
                      >
                        Reparación de chapa y pintura
                      </option>
                      <option
                        value="Revisión"
                        className="font-semibold text-gray-700 text-md"
                      >
                        Revisión
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-xl font-semibold mb-2"
                  htmlFor="descripcion"
                >
                  Descripción
                </label>
                <textarea
                  id="Descripcion"
                  name="descripcion"
                  className="border-2 border-blue-950 rounded-lg w-full py-1 px-2 mb-3"
                  required
                  maxLength={500}
                  onChange={formik.handleChange}
                  value={formik.values.descripcion}
                ></textarea>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-950 hover:bg-orange-500 text-white text-2xl font-semibold p-3 px-4 rounded-lg"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Agregando..." : "Agregar Servicio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Agregar;
