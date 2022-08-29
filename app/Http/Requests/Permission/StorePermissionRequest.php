<?php

namespace App\Http\Requests\Permission;

use Illuminate\Foundation\Http\FormRequest;

class StorePermissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|unique:permissions,name',
            'display_name' => 'required|string',
            'group_permission_id' => 'required|integer|exists:group_permissions,id',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name field must be a string.',
            'name.unique' => 'The name field must be unique.',
            'display_name.required' => 'The display name field is required.',
            'display_name.string' => 'The display name field must be a string.',
            'group_permission_id.required' => 'The group permission id field is required.',
            'group_permission_id.integer' => 'The group permission id field must be an integer.',
            'group_permission_id.exists' => 'The group permission id field must exist in the group permissions table.',
        ];
    }
}
