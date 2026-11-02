<?php

namespace App\Models;

use App\Models\BaseModel;
use App\Scopes\CompanyScope;

class PaymentMode extends BaseModel
{
    protected $table = 'payment_modes';

    protected $default = ['xid', 'name', 'mode_type', 'credentials'];

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $filterable = ['name', 'mode_type'];

    protected $hidden = ['id'];

    protected $appends = ['xid', 'upi_id'];

    protected $casts = [
        'credentials' => 'array',
    ];

    public function getUpiIdAttribute()
    {
        if (isset($this->attributes['upi_id']) && !empty($this->attributes['upi_id'])) {
            return $this->attributes['upi_id'];
        }

        $credentials = $this->credentials;
        if (is_array($credentials) && isset($credentials['upi_id'])) {
            return $credentials['upi_id'];
        }

        return null;
    }

    public function setUpiIdAttribute($value)
    {
        if (array_key_exists('upi_id', $this->attributes)) {
            $this->attributes['upi_id'] = $value;
        }
        $credentials = $this->credentials ?? [];
        if (!is_array($credentials)) {
            $credentials = [];
        }
        $credentials['upi_id'] = $value;
        $this->credentials = $credentials;
    }

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new CompanyScope);
    }
}
