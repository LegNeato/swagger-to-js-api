/* flow */

const isObject = (value: any): boolean => {
  return value === Object(value);
};

const isArray = (value: any): boolean => {
  return Array.isArray(value);
};

const isFile = (value: any): boolean => {
  return value instanceof File;
};

const objectToFormData = (
  obj: Object | Array,
  formData: ?FormData,
  preKey: ?string,
): FormData => {
  formData = formData || new FormData();

  Object.keys(obj).forEach(function(prop) {
    let key = preKey ? preKey + '[' + prop + ']' : prop;

    if (isObject(obj[prop]) && !isArray(obj[prop]) && !isFile(obj[prop])) {
      objectToFormData(obj[prop], formData, key);
    } else if (isArray(obj[prop])) {
      obj[prop].forEach(function(value) {
        let arrayKey = key + '[]';

        if (isObject(value) && !isFile(value)) {
          objectToFormData(value, formData, arrayKey);
        } else {
          formData.append(arrayKey, value);
        }
      });
    } else {
      formData.append(key, obj[prop]);
    }
  });

  return formData;
};

export default objectToFormData;
