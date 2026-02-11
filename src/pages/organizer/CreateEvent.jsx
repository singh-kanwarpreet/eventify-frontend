import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createEvent } from "../../features/events";
export default function EventCreatePage() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const imageFile = watch("image");
  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });

    try {
      await dispatch(createEvent(formData)).unwrap();
      alert("Event Created ✅");
    } catch (err) {
      alert("Error creating event: " + (err || ""));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mt-20 mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Create Event</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Event Image
            </label>

            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
              <span className="text-gray-500 text-sm">Click to upload</span>

              <input
                type="file"
                accept="image/*"
                {...register("image", { required: "Image required" })}
                className="hidden"
              />
            </label>

            {/* Preview */}
            {imageFile?.[0] && (
              <img
                src={URL.createObjectURL(imageFile[0])}
                alt="preview"
                className="h-32 mt-4 rounded-lg object-cover border"
              />
            )}

            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Title */}
          <input
            placeholder="Event Title"
            {...register("title", { required: "Title required" })}
            className="w-full border rounded-lg p-3"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
          {/* Description */}
          <textarea
            rows="4"
            placeholder="Description"
            {...register("description", { required: true })}
            className="w-full border rounded-lg p-3"
          />
          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="datetime-local"
              {...register("startTime", { required: true })}
              className="border rounded-lg p-3"
            />

            <input
              type="datetime-local"
              {...register("endTime", { required: true })}
              className="border rounded-lg p-3"
            />
          </div>
          {/* Location + Mode */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Location"
              {...register("location", { required: true })}
              className="border rounded-lg p-3"
            />

            <select {...register("mode")} className="border rounded-lg p-3">
              <option value="offline">Offline</option>
              <option value="online">Online</option>
            </select>
          </div>
          {/* Capacity */}
          <input
            type="number"
            placeholder="Capacity"
            {...register("capacity", { min: 1 })}
            className="border rounded-lg p-3 w-full"
          />
          {/* Age rules */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Min Age"
              {...register("minAge")}
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              placeholder="Max Age"
              {...register("maxAge")}
              className="border rounded-lg p-3"
            />
          </div>
          {/* Submit */}
          <button
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
